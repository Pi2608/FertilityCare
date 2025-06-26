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
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
public class MedicineScheduleService {

    @Autowired
    private MedicineScheduleRepository medicineScheduleRepository;

    @Autowired
    private CycleStepRepository cycleStepRepository;

    @Autowired
    private MedicineRepository medicineRepository;

    @Transactional
    public StatusMedicineDTO updateMedicineStatus(int cycleId,
                                                  int stepOrder,
                                                  StatusMedicineSchedule newStatus,
                                                  String eventDate) {

        if (newStatus == StatusMedicineSchedule.ongoing) {
            throw new IllegalArgumentException("Không thể cập nhật trạng thái về 'ONGOING'.");
        }

        // Tìm bước trong chu kỳ
        CycleStep step = cycleStepRepository.findByCycle_CycleIdAndStepOrder(cycleId, stepOrder);
        if (step == null) {
            throw new NotFoundException("Không tìm thấy bước điều trị trong chu kỳ.");
        }

        // Parse thời gian
        DateTimeFormatter formatter = DateTimeFormatter.ISO_DATE_TIME;
        LocalDateTime parsedEventDate = LocalDateTime.parse(eventDate, formatter);

        // Tìm lịch thuốc
        MedicineSchedule schedule = medicineScheduleRepository
                .findByCycleStep_StepIdAndEventDate(step.getStepId(), parsedEventDate);

        if (schedule == null) {
            throw new NotFoundException("Không tìm thấy thuốc tại thời điểm " + eventDate + " trong bước " + stepOrder + ".");
        }

        // 🚫 Không cho update nếu trạng thái đã khác 'ongoing'
        if (schedule.getStatus() != StatusMedicineSchedule.ongoing) {
            throw new IllegalStateException("Không thể cập nhật. Trạng thái thuốc hiện tại là '" + schedule.getStatus());
        }

        // ✅ Cập nhật
        schedule.setStatus(newStatus);
        medicineScheduleRepository.save(schedule);

        return new StatusMedicineDTO(
                schedule.getCycleStep().getCycle().getCycleId(),
                schedule.getCycleStep().getStepOrder(),
                schedule.getStatus(),
                schedule.getEventDate()
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
                        ms.getStartDate(),
                        ms.getEndDate(),
                        ms.getEventDate(),
                        ms.getStatus(),
                        ms.getNote()
                )).toList();
    }

    public List<MedicineScheduleDTO> createSchedule(CreateMedicationScheduleDTO dto) {
        Medicine medicine = medicineRepository.findById(dto.getMedicineId())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy thuốc"));

        CycleStep step = cycleStepRepository.findById(dto.getStepId())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy bước điều trị"));

        if (step.getCycle().getCycleId() != dto.getCycleId()) {
            throw new RuntimeException("Bước điều trị không thuộc chu kỳ đã chọn");
        }

        List<MedicineScheduleDTO> result = new ArrayList<>();
        LocalDate currentDate = dto.getStartDate(); // Chỉ lấy ngày

        while (!currentDate.isAfter(dto.getEndDate())) {
            for (Time time : medicine.getUseAt()) {
                LocalDateTime eventDateTime = LocalDateTime.of(currentDate, time.toLocalTime());

                MedicineSchedule schedule = new MedicineSchedule();
                schedule.setMedicine(medicine);
                schedule.setCycleStep(step);
                schedule.setStartDate(dto.getStartDate());
                schedule.setEndDate(dto.getEndDate());
                schedule.setEventDate(eventDateTime);
                schedule.setStatus(StatusMedicineSchedule.ongoing);

                medicineScheduleRepository.save(schedule);

                result.add(new MedicineScheduleDTO(
                        schedule.getMedicationId(),
                        step.getStepOrder(),
                        medicine.getName(),
                        schedule.getStartDate(),
                        schedule.getEndDate(),
                        schedule.getEventDate(),
                        schedule.getStatus(),
                        schedule.getNote()
                ));
            }

            currentDate = currentDate.plusDays(1);
        }

        return result;
    }
}