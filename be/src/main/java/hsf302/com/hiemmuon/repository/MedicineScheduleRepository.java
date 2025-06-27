package hsf302.com.hiemmuon.repository;

import hsf302.com.hiemmuon.entity.MedicineSchedule;
import hsf302.com.hiemmuon.enums.StatusMedicineSchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface MedicineScheduleRepository extends JpaRepository<MedicineSchedule, Integer> {
    List<MedicineSchedule> findByCycleStep_StepId(int stepId);

    List<MedicineSchedule> findByStatus(StatusMedicineSchedule status);

    @Query("SELECT ms.eventDate FROM MedicineSchedule ms WHERE ms.medicine.medicinId = :medicineId AND ms.cycleStep.stepId = :stepId")
    List<LocalDateTime> findAllEventTimesByMedicineAndStep(@Param("medicineId") int medicineId,
                                                            @Param("stepId") int stepId);

    List<MedicineSchedule> findAllByEventDateBetween(
            LocalDateTime startDate,
            LocalDateTime endDate
    );
}