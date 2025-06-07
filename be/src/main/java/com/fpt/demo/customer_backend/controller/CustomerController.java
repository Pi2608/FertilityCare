package com.fpt.demo.customer_backend.controller;

import com.fpt.demo.customer_backend.model.Customer;
import com.fpt.demo.customer_backend.model.User;
import com.fpt.demo.customer_backend.repository.CustomerRepository;
import com.fpt.demo.customer_backend.repository.UserRepository;
import com.fpt.demo.customer_backend.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.fpt.demo.customer_backend.util.JwtUtil;


import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/customers")
public class CustomerController {

    @Autowired
    private CustomerService customerService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CustomerRepository customerRepository;
    @Autowired
    private JwtUtil jwtUtil;

    @GetMapping
    public List<Customer> getAll(){
        return customerService.getAll();
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody Customer customer) {
        Customer created = customerService.createCustomerWithUser(customer);
        return ResponseEntity.ok(Map.of(
                "message", "Đăng ký tài khoản thành công!",
                "customer_id", created.getCustomer_id()
        ));
    }

    @GetMapping("/me")
    public ResponseEntity<?> getMyInfo(@RequestHeader("Authorization") String token){
        // bo tien to "Bearer"
        String jwt = token.substring(7);
        // lay email tu JWT
        String email = jwtUtil.extractEmail(jwt);
        // Tim user theo email
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("không tim thay user");
        }

        User user = userOpt.get();

        // Tim customer the user
        Optional<Customer> customerOpt = customerRepository.findByUser((user));
        if(customerOpt.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Khong tim thay customer");
        }

        return ResponseEntity.ok(customerOpt.get());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getCustomerById(@PathVariable Long id) {
        Optional<Customer> customer = customerRepository.findById(id);

        if (customer.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tìm thấy khách hàng");
        }

        return ResponseEntity.ok(customer.get());
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateCustomer(
            @PathVariable Long id,
            @RequestBody Customer updatedData,
            @RequestHeader("Authorization") String token){
        // check ID hop le
        Optional<Customer> existingOpt = customerRepository.findById(id);
        if(existingOpt.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("khong tim thay khach hang");
        }

        Customer existing = existingOpt.get();

        // lay email tu JWT de so sanh
        String jwt = token.substring(7);
        String email = jwtUtil.extractEmail(jwt);

        // chi cho phep user cua chinh minh sua
        if(!existing.getUser().getEmail().equals(email)){
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Khong co quyen chinh sua thong tin nguoi khac");
        }

        // cap nhat thong tin
        existing.setIs_active(updatedData.isIs_active());
        existing.setMedical_history(updatedData.getMedical_history());

        User user = existing.getUser();
        User updatedUser = updatedData.getUser();

        user.setName(updatedUser.getName());
        user.setPhone(updatedUser.getPhone());
        user.setDob(updatedUser.getDob());
        user.setGender(updatedUser.getGender());

        user.setUpdate_at(LocalDate.now());

        // Luu
        customerRepository.save(existing);
        return ResponseEntity.ok("Cap nhat thanh cong");

    }
     {
    }


}
