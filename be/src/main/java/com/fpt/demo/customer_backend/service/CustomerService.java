package com.fpt.demo.customer_backend.service;

import com.fpt.demo.customer_backend.model.Customer;
import com.fpt.demo.customer_backend.model.User;
import com.fpt.demo.customer_backend.repository.CustomerRepository;
import com.fpt.demo.customer_backend.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class CustomerService {
    @Autowired
    private CustomerRepository customerRepo;

    @Autowired
    private UserRepository userRepo;

    public List<Customer> getAll(){
        return customerRepo.findAll();
    }

    @Transactional
    public Customer createCustomerWithUser(Customer customer){
        if (customer == null || customer.getUser() == null) {
            throw new IllegalArgumentException("Customer and User cannot be null");
        }

        // Set thông tin mặc định cho user
        User user = customer.getUser();
        user.setCreate_at(LocalDate.now());
        user.setUpdate_at(LocalDate.now());
        user.setRole_id(4);

        // ✅ Mã hoá mật khẩu
        user.setPassword_hash(
                BCrypt.hashpw(user.getPassword_hash(), BCrypt.gensalt())
        );

        if(userRepo.findByEmail(user.getEmail()).isPresent()){
            throw new RuntimeException("Email da ton tai, vui long chon email khac.");
        }
        // Lưu user trước
        User savedUser = userRepo.save(user);
        if (savedUser == null || savedUser.getUser_id() == null) {
            throw new RuntimeException("Failed to save user");
        }


        // Gán user đã lưu vào customer rồi lưu
        customer.setUser(savedUser);
        return customerRepo.save(customer);

    }

}
