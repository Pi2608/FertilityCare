package hsf302.com.hiemmuon.service;

import hsf302.com.hiemmuon.dto.createDto.CreateMedicationScheduleDTO;
import hsf302.com.hiemmuon.dto.responseDto.MedicineScheduleDTO;
import hsf302.com.hiemmuon.dto.responseDto.StatusMedicineDTO;
import hsf302.com.hiemmuon.entity.CycleStep;
import hsf302.com.hiemmuon.entity.Medicine;
import hsf302.com.hiemmuon.entity.MedicineSchedule;
import hsf302.com.hiemmuon.enums.StatusMedicineSchedule;
import hsf302.com.hiemmuon.exception.NotFoundException;
import hsf302.com.hiemmuon.repository.CycleStepRepository;
import hsf302.com.hiemmuon.repository.MedicineRepository;
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
    private MedicineRepository medicineRepository;

    @Transactional
    public StatusMedicineDTO updateMedicineStatus(
            int scheduleId,
            StatusMedicineSchedule newStatus) {

        if (newStatus == StatusMedicineSchedule.dang_dien_ra || newStatus == StatusMedicineSchedule.qua_han) {
            throw new IllegalArgumentException("Không thể cập nhật trạng thái '" + newStatus + "' bằng tay.");
        }

        // Tìm lịch thuốc
        MedicineSchedule schedule = medicineScheduleRepository
                .findById(scheduleId).orElseThrow(() -> new NotFoundException("Không tìm thấy lịch thuốc với ID: " + scheduleId));

        // 🚫 Không cho update nếu trạng thái đã khác 'ongoing'
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
                .map(ms -> new MedicineScheduleDTO(
                        ms.getMedicationId(),
                        ms.getCycleStep().getStepOrder(),
                        ms.getMedicine().getName(),
                        ms.getMedicine().getDiscription(),
                        ms.getMedicine().getDose(),
                        ms.getMedicine().getFrequency(),
                        ms.getStartDate(),
                        ms.getEndDate(),
                        ms.getEventDate(),
                        ms.getStatus(),
                        ms.getNote()
                )).toList();
    }

    public List<MedicineScheduleDTO> createSchedule(CreateMedicationScheduleDTO dto) {
        // Lấy thuốc và bước điều trị
        Medicine medicine = medicineRepository.findById(dto.getMedicineId())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy thuốc"));

        CycleStep step = cycleStepRepository.findById(dto.getStepId())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy bước điều trị"));

        if (step.getCycle().getCycleId() != dto.getCycleId()) {
            throw new RuntimeException("Bước điều trị không thuộc chu kỳ đã chọn");
        }

        List<MedicineScheduleDTO> result = new ArrayList<>();

        // 🧠 Bước 1: Tạo tất cả các eventDateTime cần lên lịch
        List<LocalDateTime> targetTimes = new ArrayList<>();
        LocalDate currentDate = dto.getStartDate();

        while (!currentDate.isAfter(dto.getEndDate())) {
            for (Time time : medicine.getUseAt()) {
                targetTimes.add(LocalDateTime.of(currentDate, time.toLocalTime()));
            }
            currentDate = currentDate.plusDays(1);
        }

        // 🧠 Bước 2: Lấy danh sách eventDateTime đã tồn tại trong DB
        List<LocalDateTime> existedTimes = medicineScheduleRepository
                .findAllEventTimesByMedicineAndStep(medicine.getMedicinId(), step.getStepId());

        Set<LocalDateTime> existedSet = new HashSet<>(existedTimes);

        // 🧠 Bước 3: Tạo lịch mới cho những event chưa có
        for (LocalDateTime eventDateTime : targetTimes) {
            if (existedSet.contains(eventDateTime)) {
                continue; // Bỏ qua nếu đã tồn tại
            }

            MedicineSchedule schedule = new MedicineSchedule();
            schedule.setMedicine(medicine);
            schedule.setCycleStep(step);
            schedule.setStartDate(dto.getStartDate());
            schedule.setEndDate(dto.getEndDate());
            schedule.setEventDate(eventDateTime);
            schedule.setStatus(StatusMedicineSchedule.dang_dien_ra);

            medicineScheduleRepository.save(schedule);

            result.add(new MedicineScheduleDTO(
                    schedule.getMedicationId(),
                    step.getStepOrder(),
                    medicine.getName(),
                    medicine.getDiscription(),
                    medicine.getDose(),
                    medicine.getFrequency(),
                    schedule.getStartDate(),
                    schedule.getEndDate(),
                    schedule.getEventDate(),
                    schedule.getStatus(),
                    schedule.getNote()
            ));
        }
        return result;
    }

    public void updateExpiredSchedules() {
        LocalDateTime now = LocalDateTime.now();

        List<MedicineSchedule> schedules = medicineScheduleRepository
                .findByStatus(StatusMedicineSchedule.dang_dien_ra);

        for (MedicineSchedule schedule : schedules) {
            Medicine medicine = schedule.getMedicine();

            List<Time> useAt = medicine.getUseAt();

            for (Time time : useAt) {
                LocalDateTime scheduledTime = LocalDateTime.of(schedule.getEventDate().toLocalDate(), time.toLocalTime());

                // Nếu thời gian hiện tại đã qua thời gian sự kiện
                if (now.isAfter(scheduledTime.plusHours(1))) {
                    schedule.setStatus(StatusMedicineSchedule.qua_han);
                }
            }
        }
        medicineScheduleRepository.saveAll(schedules);
    }

    public List<MedicineScheduleDTO> getSchedulesByDate(LocalDate date) {
        // Lấy từ 00:00 đến 23:59:59
        LocalDateTime startOfDay = date.atStartOfDay();
        LocalDateTime endOfDay = date.atTime(LocalTime.MAX);

        List<MedicineSchedule> schedules = medicineScheduleRepository
                .findAllByEventDateBetween(startOfDay, endOfDay);

        return schedules.stream().map(schedule -> new MedicineScheduleDTO(
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
        )).toList();
    }
}