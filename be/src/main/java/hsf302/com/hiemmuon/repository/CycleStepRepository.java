package hsf302.com.hiemmuon.repository;

import hsf302.com.hiemmuon.dto.responseDto.MedicineScheduleDTO;
import hsf302.com.hiemmuon.dto.responseDto.NoteDTO;
import hsf302.com.hiemmuon.dto.testresult.TestResultViewDTO;
import hsf302.com.hiemmuon.entity.CycleStep;
import hsf302.com.hiemmuon.entity.MedicineSchedule;
import hsf302.com.hiemmuon.entity.TestResult;
import hsf302.com.hiemmuon.entity.TreatmentStep;
import hsf302.com.hiemmuon.enums.StatusCycle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository

public interface CycleStepRepository extends JpaRepository<CycleStep, Integer> {

    List<CycleStep> findByCycle_CycleId(int cycleId);

    CycleStep findByCycle_CycleIdAndStepOrder(int cycleId, int stepOrder);

    List<CycleStep> findByCycle_CycleIdAndStepOrderGreaterThan(int cycleId, int stepOrder);

    List<CycleStep> findByCycle_CycleIdAndStepOrderLessThan(int cycleId, int stepOrder);

    List<CycleStep> findByCycle_CycleIdAndStatusCycleStepOrderByStepOrderAsc(
            int cycleId, StatusCycle statusCycleStep);

    CycleStep findFirstByCycle_CycleIdAndStatusCycleStepOrderByStepOrderAsc(
            int cycleId, StatusCycle statusCycleStep
    );

    CycleStep findById(int cycleStepId);


    @Query("SELECT c.note FROM CycleStep c WHERE c.stepId = :stepId")
    String findNoteByStepId(@Param("stepId") int stepId);

    @Query("SELECT cs.stepId FROM CycleStep cs WHERE cs.cycle.cycleId = :cycleId ORDER BY cs.stepOrder ASC")
    List<Integer> findStepIdsByCycleIdOrdered(@Param("cycleId") int cycleId);

    List<CycleStep> findByEventdateBetween(LocalDateTime from, LocalDateTime to);

    List<CycleStep> findAllByTreatmentStep(TreatmentStep step);

}