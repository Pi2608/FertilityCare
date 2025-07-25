package hsf302.com.hiemmuon.service;

import hsf302.com.hiemmuon.dto.responseDto.*;
import hsf302.com.hiemmuon.dto.testresult.TestResultViewDTO;
import hsf302.com.hiemmuon.dto.updateDto.NoteMedicineScheduleDTO;
import hsf302.com.hiemmuon.entity.*;
import hsf302.com.hiemmuon.enums.StatusCycle;
import hsf302.com.hiemmuon.exception.NotFoundException;
import hsf302.com.hiemmuon.repository.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.print.Doc;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CycleStepService {

    @Autowired
    private CycleStepRepository cycleStepRepository;

    @Autowired
    private CycleRepository cycleRepository;

    @Autowired
    private MedicineScheduleRepository medicineScheduleRepository;

    @Autowired
    private TestResultRepository testResultRepository;

    @Autowired
    private SendMailService sendMailService;


    public List<CycleStepDTO> getAllCycleStep(int cycleId) {

        if (!cycleRepository.existsById(cycleId)) {
            throw new NotFoundException("Không tìm thấy chu kỳ điều trị với cycleId = " + cycleId);
        }

        return cycleStepRepository.findByCycle_CycleId(cycleId)
                .stream()
                .map(this::convertToDTO)
                .toList();
    }

    public CycleStepDTO getCycleStep(int cycleId, int stepOrder) {
        CycleStep step = cycleStepRepository.findByCycle_CycleIdAndStepOrder(cycleId, stepOrder);
        if (step == null) {
            throw new NotFoundException(
                    String.format("Không tìm thấy bước điều trị với cycleId = %d và stepOrder = %d", cycleId, stepOrder)
            );
        }
        return convertToDTO(step);
    }

    public CycleStepDTO updateCycleStepStatus(int cycleId,
                                              int stepOrder,
                                              StatusCycle status,
                                              String reason,
                                              LocalDateTime changeDate) {

        // 1. Tìm bước theo Cycle và stepOrder
        CycleStep step = cycleStepRepository.findByCycle_CycleIdAndStepOrder(cycleId, stepOrder);

        // 2. Kiểm tra trạng thái không thể cập nhật
        if (step.getStatusCycleStep() == StatusCycle.finished || step.getStatusCycleStep() == StatusCycle.stopped) {
            throw new IllegalStateException("Không thể cập nhật: Bước đã kết thúc hoặc bị dừng.");
        }

        if (step.getStatusCycleStep() == status) {
            throw new IllegalStateException("Trạng thái đã là '" + status + "', không thể cập nhật lại.");
        }

        // 3. Nếu không phải restart thì kiểm tra các bước trước đã hoàn thành chưa
        if (status != StatusCycle.restarted) {
            List<CycleStep> previousSteps = cycleStepRepository
                    .findByCycle_CycleIdAndStepOrderLessThan(cycleId, step.getStepOrder());

            boolean allPreviousFinished = previousSteps.stream()
                    .allMatch(s -> s.getStatusCycleStep() == StatusCycle.finished);

            if (!allPreviousFinished) {
                throw new IllegalStateException("Không thể cập nhật: Các bước trước chưa hoàn thành.");
            }
        }

        // 4. Cập nhật trạng thái
        step.setStatusCycleStep(status);
        cycleStepRepository.save(step);

        // 5. Xử lý theo từng trạng thái cụ thể
        switch (status) {
            case finished -> handleStepFinished(step);
            case stopped -> handleStepStopped(step, reason);
            case restarted -> handleStepRestarted(step, reason, changeDate);
        }

        return convertToDTO(step);
    }

    public NoteMedicineScheduleDTO updateNote(int cycleId, int stepId, String note) {
        CycleStep cycleStep = cycleStepRepository.findByCycle_CycleIdAndStepOrder(cycleId, stepId);

        cycleStep.setNote(note);
        cycleStepRepository.save(cycleStep);

        return new NoteMedicineScheduleDTO(note);
    }

    private CycleStepDTO convertToDTO(CycleStep cycleStep) {
        List<MedicineSchedule> schedules = medicineScheduleRepository.findByCycleStep_StepId(cycleStep.getStepId());

        List<MedicineScheduleDTO> medicineScheduleDTOs = schedules.stream().map(schedule -> {

            return new MedicineScheduleDTO(
                    schedule.getMedicationId(),
                    schedule.getCycleStep().getStepOrder(),
                    schedule.getMedicineName(),
                    schedule.getTime(),
                    schedule.getStartDate(),
                    schedule.getEndDate(),
                    schedule.getEventDate(),
                    schedule.getStatus(),
                    schedule.getNote(),
                    schedule.getIsReminded()
            );
        }).collect(Collectors.toList());

        List<AppointmentOverviewDTO> appointmentDTOs = cycleStep.getAppointments()
                .stream()
                .map(appointment -> new AppointmentOverviewDTO(
                        appointment.getAppointmentId(),
                        appointment.getDoctor().getUser().getName(),   // <-- đây là Doctor trong entity
                        appointment.getCustomer().getUser().getName(),
                        appointment.getDate(),
                        appointment.getTypeAppointment().name(),
                        appointment.getStatusAppointment().name(),
                        appointment.getNote(),
                        appointment.getService().getName()
                ))
                .collect(Collectors.toList());

        return new CycleStepDTO(
                cycleStep.getStepId(),
                cycleStep.getStepOrder(),
                cycleStep.getCycle().getService().getName(),
                cycleStep.getDescription(),
                cycleStep.getEventdate(),
                cycleStep.getStatusCycleStep(),
                cycleStep.getNote(),
                cycleStep.getFailedReason(),
                cycleStep.getIsReminded(),
                medicineScheduleDTOs,
                appointmentDTOs
        );
    }

    public CycleStepDetailsDTO getCycleStepDetails(int cycleStepId) {
        // 5. Lấy test result
        List<TestResult> testResultList = testResultRepository.findByCycleStep_StepId(cycleStepId);
        List<TestResultViewDTO> testResults = testResultList.stream().map(r -> {
            TestResultViewDTO dto = new TestResultViewDTO();
            dto.setResultId(r.getResultId());
            dto.setName(r.getName());
            dto.setValue(r.getValue());
            dto.setUnit(r.getUnit());
            dto.setReferenceRange(r.getReferenceRange());
            dto.setTestDate(r.getTestDate());
            dto.setNote(r.getNote());
            dto.setAppointmentId(r.getAppointment().getAppointmentId());
            dto.setCycleStepId(r.getCycleStep().getStepId());
            return dto;
        }).collect(Collectors.toList());

        // 6. Lấy medicine schedule
        List<MedicineSchedule> medicineList = medicineScheduleRepository.findByCycleStep_StepId(cycleStepId);
        List<MedicineScheduleDTO> medicines = medicineList.stream().map(m -> {
            MedicineScheduleDTO dto = new MedicineScheduleDTO();
            dto.setScheduleId(m.getMedicationId());
            dto.setStepOrder(m.getCycleStep().getStepOrder());
            dto.setMedicineName(m.getMedicineName());
            dto.setTime(m.getTime());
            dto.setStartDate(m.getStartDate());
            dto.setEndDate(m.getEndDate());
            dto.setStatus(m.getStatus());
            dto.setNote(m.getNote());
            dto.setIsReminded(m.getIsReminded());
            return dto;
        }).collect(Collectors.toList());

        // 7. Lấy ghi chú từ cycleStep
        String note = cycleStepRepository.findNoteByStepId(cycleStepId);

        // 8. Gộp kết quả vào DTO
        CycleStepDetailsDTO result = new CycleStepDetailsDTO();
        result.setTestResults(testResults);
        result.setMedicineSchedules(medicines);
        result.setNote(note);

        return result;
    }

    @Transactional
    public void sendCycleStepReminders() {
        LocalDateTime from = LocalDate.now().atStartOfDay();
        LocalDateTime to = from.plusDays(2);

        List<CycleStep> steps = cycleStepRepository.findByEventdateBetween(from, to);

        for (CycleStep step : steps) {
            String toEmail = step.getCycle().getCustomer().getUser().getEmail();
            String name = step.getCycle().getCustomer().getUser().getName();
            String service = step.getCycle().getService().getName();
            String treatmentStep = step.getCycle().getService().getName();
            LocalDateTime eventTime = step.getEventdate();

            String subject = "⏰ Nhắc lịch bước điều trị sắp tới";
            String text = String.format("""
                    Chào %s,
                    
                    Đây là lời nhắc rằng bạn sẽ có bước điều trị "%s" (thuộc dịch vụ "%s") 
                    diễn ra vào lúc %s.
                    
                    Chúc bạn một ngày an lành và luôn khỏe mạnh!
                    
                    — Fertility Care System
                    """, name, treatmentStep, service, eventTime.toString());

            sendMailService.sendEmail(toEmail, subject, text);

            step.setIsReminded(true);
        }
    }

    private void handleStepFinished(CycleStep step) {
        int cycleId = step.getCycle().getCycleId();

        // Gán eventDate cho bước kế tiếp nếu chưa có
        CycleStep nextStep = cycleStepRepository.findByCycle_CycleIdAndStepOrder(cycleId, step.getStepOrder() + 1);
        if (nextStep != null && nextStep.getEventdate() == null && step.getEventdate() != null) {
            nextStep.setEventdate(step.getEventdate().plusDays(1));
            cycleStepRepository.save(nextStep);
        }

        // Kiểm tra nếu tất cả các bước đều hoàn thành thì kết thúc cycle
        List<CycleStep> allSteps = cycleStepRepository.findByCycle_CycleId(cycleId);
        boolean allStepsFinished = allSteps.stream()
                .allMatch(s -> s.getStatusCycleStep() == StatusCycle.finished);

        if (allStepsFinished) {
            Cycle cycle = step.getCycle();
            cycle.setStatus(StatusCycle.finished);
            cycleRepository.save(cycle);
        }
    }

    private void handleStepStopped(CycleStep step, String reason) {
        step.setFailedReason(reason);

        int cycleId = step.getCycle().getCycleId();
        List<CycleStep> laterSteps = cycleStepRepository
                .findByCycle_CycleIdAndStepOrderGreaterThan(cycleId, step.getStepOrder());

        for (CycleStep s : laterSteps) {
            s.setStatusCycleStep(StatusCycle.stopped);
        }
        cycleStepRepository.saveAll(laterSteps);

        Cycle cycle = step.getCycle();
        cycle.setStatus(StatusCycle.stopped);
        cycleRepository.save(cycle);
    }

    private void handleStepRestarted(CycleStep step, String reason, LocalDateTime changeDate) {

        // Mở lại trạng thái "processing" cho bước hiện tại
        step.setStatusCycleStep(StatusCycle.ongoing);
        step.setFailedReason(reason);
        step.setEventdate(changeDate);
        cycleStepRepository.save(step);

        // Mở lại các bước sau nếu chúng bị stopped
        int cycleId = step.getCycle().getCycleId();
        List<CycleStep> laterSteps = cycleStepRepository
                .findByCycle_CycleIdAndStepOrderGreaterThan(cycleId, step.getStepOrder());

        for (CycleStep s : laterSteps) {
            if (s.getStatusCycleStep() == StatusCycle.stopped) {
                s.setStatusCycleStep(StatusCycle.ongoing); // hoặc `waiting` nếu bạn định nghĩa
            }
        }
        cycleStepRepository.saveAll(laterSteps);

        // Cập nhật lại trạng thái cycle nếu nó đang là stopped
        Cycle cycle = step.getCycle();
        if (cycle.getStatus() == StatusCycle.stopped) {
            cycle.setStatus(StatusCycle.ongoing);
            cycleRepository.save(cycle);
        }
    }

}