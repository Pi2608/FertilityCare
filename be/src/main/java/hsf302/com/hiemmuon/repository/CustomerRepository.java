package hsf302.com.hiemmuon.repository;

import hsf302.com.hiemmuon.entity.Customer;
import hsf302.com.hiemmuon.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Integer> {
    @Query("SELECT c FROM Customer c JOIN FETCH c.user")
    List<Customer> findAllWithUser();

    Customer findByUser(User user);

    Customer findByCustomerId(int customerId);
}