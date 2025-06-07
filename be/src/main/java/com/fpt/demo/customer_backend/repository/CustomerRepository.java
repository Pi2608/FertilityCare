package com.fpt.demo.customer_backend.repository;

import com.fpt.demo.customer_backend.model.Customer;
import com.fpt.demo.customer_backend.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface CustomerRepository extends JpaRepository<Customer, Long> {
    Optional<Customer> findByUser(User user);
}
