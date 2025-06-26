package hsf302.com.hiemmuon.repository;

import hsf302.com.hiemmuon.entity.CycleStep;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository

public interface CycleStepRepository extends JpaRepository<CycleStep, Integer> {

    List<CycleStep> findByCycle_CycleId(int cycleId);

    CycleStep findByCycle_CycleIdAndStepOrder(int cycleId, int stepOrder);

    List<CycleStep> findByCycle_CycleIdAndStepOrderGreaterThan(int cycleId, int stepOrder);
}