package hsf302.com.hiemmuon.repository;

import hsf302.com.hiemmuon.dto.responseDto.MedicineScheduleDTO;
import hsf302.com.hiemmuon.entity.MedicineSchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface MedicineScheduleRepository extends JpaRepository<MedicineSchedule, Integer> {
    List<MedicineSchedule> findByCycleStep_StepId(int stepId);

    MedicineSchedule findByCycleStep_StepIdAndEventDate(int stepId, LocalDateTime eventDate);
}
