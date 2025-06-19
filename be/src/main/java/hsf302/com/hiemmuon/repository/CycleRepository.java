package hsf302.com.hiemmuon.repository;

import hsf302.com.hiemmuon.entity.Cycle;
import hsf302.com.hiemmuon.entity.Customer;
import hsf302.com.hiemmuon.entity.TreatmentService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface CycleRepository extends JpaRepository<Cycle, Integer> {
    // Read operations
    List<Cycle> findByCustomer(Customer customer);
    List<Cycle> findByService(TreatmentService service);
    List<Cycle> findByStatus(Cycle.Status status);
    List<Cycle> findByStartdateBetween(LocalDate startDate, LocalDate endDate);
    
    // Combined search
    List<Cycle> findByCustomerAndStatus(Customer customer, Cycle.Status status);
    List<Cycle> findByCustomerAndStartdateBetween(Customer customer, LocalDate startDate, LocalDate endDate);
    
    // Count operations
    long countByStatus(Cycle.Status status);
    long countByCustomer(Customer customer);
    
    // Custom query example
    @Query("SELECT c FROM Cycle c WHERE c.customer = :customer AND c.status = 'ongoing'")
    List<Cycle> findOngoingCyclesByCustomer(@Param("customer") Customer customer);
    
    // Exists check
    boolean existsByCustomerAndStatus(Customer customer, Cycle.Status status);
}