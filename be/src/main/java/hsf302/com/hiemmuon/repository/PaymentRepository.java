package hsf302.com.hiemmuon.repository;

import hsf302.com.hiemmuon.entity.Payment;
import hsf302.com.hiemmuon.enums.StatusPayment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Integer> {
    @Query("SELECT p FROM Payment p WHERE p.customer.customerId = :customerId")
    List<Payment> findByCustomerId(@Param("customerId") int customerId);

    @Query("SELECT p FROM Payment p WHERE p.customer.customerId = :customerId AND p.status = :status")
    List<Payment> findByCustomerIdAndStatus(@Param("customerId") int customerId, @Param("status") StatusPayment status);

    @Query("""
    SELECT COALESCE(SUM(p.total), 0) 
    FROM Payment p 
    WHERE p.status = 'PAID' 
""")
    Long getRevenueThisMonth();

}