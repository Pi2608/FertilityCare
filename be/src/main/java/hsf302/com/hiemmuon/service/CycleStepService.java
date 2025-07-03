package hsf302.com.hiemmuon.service;

import hsf302.com.hiemmuon.dto.responseDto.*;
import hsf302.com.hiemmuon.dto.testresult.TestResultViewDTO;
import hsf302.com.hiemmuon.dto.updateDto.NoteMedicineScheduleDTO;
import hsf302.com.hiemmuon.entity.*;
import hsf302.com.hiemmuon.enums.StatusCycle;
import hsf302.com.hiemmuon.exception.NotFoundException;
import hsf302.com.hiemmuon.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import javax.print.Doc;
import java.time.LocalDate;
import java.util.List;
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
    private UserRepository userRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private TestResultRepository testResultRepository;


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

    public CycleStepDTO updateCycleStepStatus(int cycleId, int stepId, StatusCycle status) {
        CycleStep step = cycleStepRepository.findByCycle_CycleIdAndStepOrder(cycleId, stepId);

        if (step.getStatusCycleStep() == StatusCycle.finished || step.getStatusCycleStep() == StatusCycle.stopped) {
            throw new IllegalStateException("Không thể cập nhật: Bước đã kết thúc hoặc đã bị dừng.");
        }

        if (step.getStatusCycleStep() == status) {
            throw new IllegalStateException("Trạng thái đã là '" + status + "', không thể cập nhật lại.");
        }

        List<CycleStep> previousSteps = cycleStepRepository
                .findByCycle_CycleIdAndStepOrderLessThan(cycleId, step.getStepOrder());

        boolean allPreviousFinished = previousSteps.stream()
                .allMatch(s -> s.getStatusCycleStep() == StatusCycle.finished);

        if (!allPreviousFinished) {
            throw new IllegalStateException("Không thể cập nhật: Tất cả các bước trước phải hoàn thành trước.");
        }

        step.setStatusCycleStep(status);
        cycleStepRepository.save(step);

        if (status == StatusCycle.finished) {
            // Gán eventDate cho bước kế tiếp nếu chưa có
            CycleStep nextStep = cycleStepRepository.findByCycle_CycleIdAndStepOrder(
                    cycleId, step.getStepOrder() + 1);

            if (nextStep != null && nextStep.getEventdate() == null) {
                LocalDate nextEventDate = step.getEventdate().plusDays(1);
                nextStep.setEventdate(nextEventDate);
                cycleStepRepository.save(nextStep);
            }

            // Nếu tất cả các bước đã hoàn thành -> kết thúc cycle
            List<CycleStep> allSteps = cycleStepRepository.findByCycle_CycleId(cycleId);
            boolean allStepsFinished = allSteps.stream()
                    .allMatch(s -> s.getStatusCycleStep() == StatusCycle.finished);

            if (allStepsFinished) {
                Cycle cycle = step.getCycle();
                cycle.setStatus(StatusCycle.finished);
                cycleRepository.save(cycle);
            }
        }

        if (status == StatusCycle.stopped) {
            // Dừng các bước sau
            List<CycleStep> lateSteps = cycleStepRepository
                    .findByCycle_CycleIdAndStepOrderGreaterThan(cycleId, step.getStepOrder());

            for (CycleStep lateStep : lateSteps) {
                lateStep.setStatusCycleStep(StatusCycle.stopped);
            }
            cycleStepRepository.saveAll(lateSteps);

            Cycle cycle = step.getCycle();
            cycle.setStatus(StatusCycle.stopped);
            cycleRepository.save(cycle);
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
            List<MedicineDTO> medicineDTOList = List.of(
                    new MedicineDTO(
                            schedule.getMedicine().getName(),
                            schedule.getMedicine().getDiscription(),
                            schedule.getMedicine().getDose(),
                            schedule.getMedicine().getFrequency(),
                            schedule.getMedicine().getUseAt()
                    )
            );

            return new MedicineScheduleDTO(
                    schedule.getMedicationId(),
                    schedule.getCycleStep().getStepOrder(),
                    schedule.getMedicine().getName(),
                    schedule.getMedicine().getDiscription(),
                    schedule.getMedicine().getDose(),
                    schedule.getMedicine().getFrequency(),
                    schedule.getStartDate(),
                    schedule.getEndDate(),
                    schedule.getEventDate(),
                    schedule.getStatus(),
                    schedule.getNote()
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
                medicineScheduleDTOs,
                appointmentDTOs
        );
    }

    public CycleStepDetailsDTO getCycleStepDetails(int cycleStepId) {
        // 1. Lấy user hiện tại
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new RuntimeException("Không tìm thấy người dùng");
        }

        // 2. Lấy bác sĩ tương ứng với user
        Doctor doctor = doctorRepository.findById(user.getUserId())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy doctor"));

        // 3. Lấy cycleStep
        CycleStep cycleStep = cycleStepRepository.findById(cycleStepId);
        if(cycleStep == null) {
            throw new RuntimeException("Không tìm thấy giai đoạn điều trị");

        }
        // 4. Kiểm tra quyền truy cập (bác sĩ có nằm trong danh sách các cuộc hẹn không)
        boolean hasPermission = cycleStep
                .getAppointments()
                .stream()
                .anyMatch(a -> a.getDoctor() != null && a.getDoctor().getDoctorId() == doctor.getDoctorId());

        if (!hasPermission) {
            throw new RuntimeException("Bạn không có quyền truy cập dữ liệu này");
        }

        // 5. Lấy test result
        List<TestResult> testResultList = testResultRepository.findByCycleStep_StepId(cycleStepId);
        List<TestResultViewDTO> testResults = testResultList.stream()
                .map(r -> {
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
                })
                .collect(Collectors.toList());

        // 6. Lấy medicine schedule
        List<MedicineSchedule> medicineList = medicineScheduleRepository.findByCycleStep_StepId(cycleStepId);
        List<MedicineScheduleDTO> medicines = medicineList.stream()
                .map(m -> {
                    MedicineScheduleDTO dto = new MedicineScheduleDTO();
                    dto.setScheduleId(m.getMedicationId());
                    dto.setStepOrder(m.getCycleStep().getStepOrder());
                    dto.setMedicineName(m.getMedicine().getName());
                    dto.setDose(m.getMedicine().getDose());
                    dto.setStartDate(m.getStartDate());
                    dto.setEndDate(m.getEndDate());
                    dto.setStatus(m.getStatus());
                    return dto;
                })
                .collect(Collectors.toList());

        // 7. Lấy ghi chú từ cycleStep (chỉ là chuỗi)
        String note = cycleStepRepository.findNoteByStepId(cycleStepId); // hoặc dùng: cycleStepRepository.findNoteByStepId(cycleStepId)

        // 8. Gộp kết quả vào DTO
        CycleStepDetailsDTO result = new CycleStepDetailsDTO();
        result.setTestResults(testResults);
        result.setMedicineSchedules(medicines);
        result.setNote(note); // chỉ là 1 chuỗi

        return result;
    }

}