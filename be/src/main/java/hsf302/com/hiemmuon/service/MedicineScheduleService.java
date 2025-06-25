package hsf302.com.hiemmuon.service;

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

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class MedicineScheduleService {

    @Autowired
    private MedicineScheduleRepository medicineScheduleRepository;

    @Autowired
    private CycleStepRepository cycleStepRepository;

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
                        ms.getMedicine().getName(),
                        ms.getMedicine().getFrequency(),
                        ms.getMedicine().getDose(),
                        ms.getEventDate(),
                        ms.getStatus()
                )).toList();
    }
}
