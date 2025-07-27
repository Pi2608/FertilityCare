package hsf302.com.hiemmuon.service;

import hsf302.com.hiemmuon.dto.createDto.CreateMedicationScheduleDTO;
import hsf302.com.hiemmuon.dto.responseDto.MedicineScheduleDTO;
import hsf302.com.hiemmuon.dto.responseDto.StatusMedicineDTO;
import hsf302.com.hiemmuon.entity.CycleStep;
import hsf302.com.hiemmuon.entity.MedicineSchedule;
import hsf302.com.hiemmuon.enums.StatusMedicineSchedule;
import hsf302.com.hiemmuon.exception.NotFoundException;
import hsf302.com.hiemmuon.repository.CycleStepRepository;
import hsf302.com.hiemmuon.repository.MedicineScheduleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Time;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class MedicineScheduleService {

    @Autowired
    private MedicineScheduleRepository medicineScheduleRepository;

    @Autowired
    private CycleStepRepository cycleStepRepository;

    @Autowired
    private SendMailService sendMailService;

    @Transactional
    public StatusMedicineDTO updateMedicineStatus(
            int scheduleId,
            StatusMedicineSchedule newStatus) {

        if (newStatus == StatusMedicineSchedule.dang_dien_ra || newStatus == StatusMedicineSchedule.qua_han) {
            throw new IllegalArgumentException("Không thể cập nhật trạng thái '" + newStatus + "' bằng tay.");
        }

        MedicineSchedule schedule = medicineScheduleRepository
                .findById(scheduleId).orElseThrow(() -> new NotFoundException("Không tìm thấy lịch thuốc với ID: " + scheduleId));

        if (schedule.getStatus() != StatusMedicineSchedule.dang_dien_ra) {
            throw new IllegalStateException("Không thể cập nhật. Trạng thái thuốc hiện tại là '" + schedule.getStatus());
        }

        // ✅ Cập nhật
        schedule.setStatus(newStatus);
        LocalTime useAt = LocalTime.now();
        medicineScheduleRepository.save(schedule);

        return new StatusMedicineDTO(
                schedule.getStatus(),
                schedule.getEventDate(),
                useAt
        );
    }

    public List<MedicineScheduleDTO> getMedicineSchedulesByCycleAndStep(int cycleId, int stepOrder) {
        CycleStep step = cycleStepRepository.findByCycle_CycleIdAndStepOrder(cycleId, stepOrder);
        if (step == null) {
            throw new NotFoundException("Không tìm thấy bước điều trị.");
        }

        List<MedicineSchedule> schedules = medicineScheduleRepository.findByCycleStep_StepId(step.getStepId());

        return schedules.stream()
                .map(this::convertToDTO)
                .toList();
    }

    public List<MedicineScheduleDTO> createSchedule(CreateMedicationScheduleDTO dto) {
        // 1. Tìm bước chu kỳ
        CycleStep step = cycleStepRepository.findById(dto.getStepId());
        if (step == null) {
            throw new RuntimeException("Không tìm thấy bước chu kỳ với id = " + dto.getStepId());
        }

        List<MedicineScheduleDTO> result = new ArrayList<>();

        // 2. Lặp qua từng ngày từ start đến end
        LocalDate current = dto.getStartDate();
        MedicineSchedule schedule = null;
        while (!current.isAfter(dto.getEndDate())) {

            // 3. Tạo đối tượng entity
            schedule = new MedicineSchedule();
            schedule.setCycleStep(step);
            schedule.setMedicineName(dto.getMedicineName());
            schedule.setStartDate(dto.getStartDate());
            schedule.setEndDate(dto.getEndDate());
            schedule.setTime(dto.getTime());
            schedule.setEventDate(LocalDateTime.of(current, dto.getTime()));
            schedule.setStatus(StatusMedicineSchedule.dang_dien_ra); // hoặc PENDING tùy enum của bạn
            schedule.setIsReminded(false);
            schedule.setNote(null);

            medicineScheduleRepository.save(schedule);

            MedicineScheduleDTO dtoResponse = new MedicineScheduleDTO(
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
            result.add(dtoResponse);
            current = current.plusDays(1);
        }
        String subject = "Thông báo lịch uống thuốc: ";
        assert schedule != null;
        String content = String.format("""
                Chào %s,
                
                Đây là nhắc nhở rằng bạn có 1 lịch uống thuốc từ ngày %s đến ngày %s.
                Vào lúc %s, bạn cần uống thuốc "%s".
                
                Vui lòng không quên thực hiện đúng giờ để đảm bảo hiệu quả điều trị.
                
                Trân trọng,
                Hệ thống hỗ trợ điều trị HiemMuon.
                """,schedule.getCycleStep().getCycle().getCustomer().getUser().getName(), schedule.getStartDate(), schedule.getEndDate(), schedule.getTime(), schedule.getMedicineName());

        sendMailService.sendEmail(step.getCycle().getCustomer().getUser().getEmail(), subject, content);
        return result;
    }


    @Transactional
    public void updateExpiredSchedules() {
        LocalDateTime now = LocalDateTime.now();

        List<MedicineSchedule> schedules = medicineScheduleRepository
                .findByStatus(StatusMedicineSchedule.dang_dien_ra);

        for (MedicineSchedule schedule : schedules) {
            LocalDateTime eventTime = schedule.getEventDate();
            if (now.isAfter(eventTime.plusMinutes(1))) {
                schedule.setStatus(StatusMedicineSchedule.qua_han);
            }
        }

        medicineScheduleRepository.saveAll(schedules);
    }

    public List<MedicineScheduleDTO> getSchedulesByCycleStepAndDate(int cycleId, int stepOrder, LocalDate date) {
        // Tạo khoảng thời gian từ đầu đến cuối ngày
        LocalDateTime startOfDay = date.atStartOfDay();
        LocalDateTime endOfDay = date.atTime(LocalTime.MAX);

        // Gọi repository để lấy đúng lịch uống thuốc theo chu kỳ, bước, và ngày
        List<MedicineSchedule> schedules = medicineScheduleRepository
                .findAllByCycleStep_Cycle_CycleIdAndCycleStep_StepOrderAndEventDateBetween(
                        cycleId, stepOrder, startOfDay, endOfDay
                );

        // Map sang DTO
        return schedules.stream()
                .map(this::convertToDTO)
                .toList();
    }

    public List<MedicineScheduleDTO> getSchedulesByCustomer(int customerId) {
        return medicineScheduleRepository.findAllByCustomerId(customerId);
    }

    private MedicineScheduleDTO convertToDTO(MedicineSchedule schedule) {
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
    }

    @Transactional
    public void sendReminderEmails() {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime start = now;
        LocalDateTime end = now.plusHours(24);

        List<MedicineSchedule> schedules = medicineScheduleRepository
                .findByStatusAndEventDateBetween(StatusMedicineSchedule.dang_dien_ra, start, end);

        for (MedicineSchedule schedule : schedules) {
            if (schedule.getIsReminded()) continue;
            String email = schedule.getCycleStep().getCycle().getCustomer().getUser().getEmail();
            String customerName = schedule.getCycleStep().getCycle().getCustomer().getUser().getName();
            String medicineName = schedule.getMedicineName();
            LocalDateTime eventTime = schedule.getEventDate();

            String subject = "Nhắc nhở uống thuốc: " + medicineName;
            String content = String.format("""
                    Chào %s,
                    
                    Đây là nhắc nhở rằng bạn cần uống thuốc "%s" vào lúc %s.
                    
                    Vui lòng không quên thực hiện đúng giờ để đảm bảo hiệu quả điều trị.
                    
                    Trân trọng,
                    Hệ thống hỗ trợ điều trị HiemMuon.
                    """, customerName, medicineName, eventTime.format(DateTimeFormatter.ofPattern("HH:mm dd-MM-yyyy")));

            sendMailService.sendEmail(email, subject, content);
            schedule.setIsReminded(true);
        }
    }
}