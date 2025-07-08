package hsf302.com.hiemmuon.repository;

import hsf302.com.hiemmuon.entity.Customer;
import hsf302.com.hiemmuon.entity.Cycle;
import hsf302.com.hiemmuon.enums.StatusCycle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface CycleRepository extends JpaRepository<Cycle, Integer> {

    List<Cycle> findByDoctor_DoctorId(int doctorId);

    List<Cycle> findByCustomer_CustomerId(int customerId);

    Cycle findById(int cycleId);

    boolean existsByCustomer_CustomerIdAndStartdate(
            int customerId, LocalDate startdate);

    @Query("SELECT c FROM Cycle c WHERE c.customer.customerId = :customerId " +
            "AND c.status IN (:statuses) " +
            "AND (c.startdate <= :endDate AND c.endDate >= :startDate)")
    List<Cycle> findOverlappingCycles(
            @Param("customerId") int customerId,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate,
            @Param("statuses") StatusCycle statuses);
}