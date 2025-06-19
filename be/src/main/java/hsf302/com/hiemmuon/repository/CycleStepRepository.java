package hsf302.com.hiemmuon.repository;

import hsf302.com.hiemmuon.entity.Cycle;
import hsf302.com.hiemmuon.entity.CycleStep;
import hsf302.com.hiemmuon.entity.TreatmentService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface CycleStepRepository extends JpaRepository<CycleStep, Integer> {
    // Read operations
    List<CycleStep> findByCycle(Cycle cycle);
    List<CycleStep> findByService(TreatmentService service);
    List<CycleStep> findByStatus(CycleStep.Status status);
    List<CycleStep> findByEventdateBetween(LocalDate startDate, LocalDate endDate);
    
    // Combined search operations
    List<CycleStep> findByCycleAndStatus(Cycle cycle, CycleStep.Status status);
    List<CycleStep> findByServiceAndStatus(TreatmentService service, CycleStep.Status status);
    List<CycleStep> findByCycleAndEventdateBetween(Cycle cycle, LocalDate startDate, LocalDate endDate);
    
    // Count operations
    long countByCycle(Cycle cycle);
    long countByStatus(CycleStep.Status status);
    
    // Custom queries
    @Query("SELECT cs FROM CycleStep cs WHERE cs.cycle = :cycle AND cs.status = 'ongoing' ORDER BY cs.eventdate DESC")
    List<CycleStep> findOngoingStepsByCycle(@Param("cycle") Cycle cycle);
    
    @Query("SELECT cs FROM CycleStep cs WHERE cs.cycle = :cycle ORDER BY cs.eventdate DESC")
    List<CycleStep> findStepsByCycleOrderByEventDateDesc(@Param("cycle") Cycle cycle);
    
    // Exists checks
    boolean existsByCycleAndStatus(Cycle cycle, CycleStep.Status status);
    boolean existsByServiceAndEventdate(TreatmentService service, LocalDate eventdate);
}