package hsf302.com.hiemmuon.repository;

import hsf302.com.hiemmuon.entity.Payment;
import hsf302.com.hiemmuon.entity.Payment.Type;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Integer> {
    @Query("SELECT p FROM Payment p WHERE p.customer.customerId = :customerId")
    List<Payment> findByCustomerId(@Param("customerId") int customerId);
}