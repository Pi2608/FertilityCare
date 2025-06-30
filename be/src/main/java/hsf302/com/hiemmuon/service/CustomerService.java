package hsf302.com.hiemmuon.service;

import hsf302.com.hiemmuon.dto.createDto.RegisterCustomerDTO;
import hsf302.com.hiemmuon.dto.responseDto.CustomerDTO;
import hsf302.com.hiemmuon.dto.updateDto.UpdateCustomerDTO;
import hsf302.com.hiemmuon.entity.Customer;
import hsf302.com.hiemmuon.entity.Role;
import hsf302.com.hiemmuon.entity.User;
import hsf302.com.hiemmuon.enums.Genders;
import hsf302.com.hiemmuon.repository.CustomerRepository;
import hsf302.com.hiemmuon.repository.RoleRepository;
import hsf302.com.hiemmuon.repository.UserRepository;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CustomerService {

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JavaMailSender mailSender;

    public List<CustomerDTO> getAllCustomers() {
        List<Customer> customers = customerRepository.findAllWithUser();

        return customers.stream().map(customer -> {
            CustomerDTO dto = new CustomerDTO();
            dto.setId(customer.getCustomerId());
            dto.setActive(customer.isActive());
            dto.setName(customer.getUser().getName());
            dto.setDob(customer.getUser().getDob());
            dto.setGender(customer.getUser().getGender());
            dto.setPhone(customer.getUser().getPhone());
            dto.setEmail(customer.getUser().getEmail());
            dto.setMedicalHistory(customer.getMedicalHistory());

            return dto;
        }).collect(Collectors.toList());
    }

    public CustomerDTO getMyInfo(String email) {
        User user = userRepository.findByEmail(email);

        Customer customer = customerRepository.findByUser(user);
        if (customer == null) throw new RuntimeException("Không tìm tháy customer");

        CustomerDTO dto = new CustomerDTO();
        dto.setId(customer.getCustomerId());
        dto.setActive(customer.isActive());
        dto.setName(customer.getUser().getName());
        dto.setDob(customer.getUser().getDob());
        dto.setGender(customer.getUser().getGender());
        dto.setPhone(customer.getUser().getPhone());
        dto.setEmail(customer.getUser().getEmail());
        dto.setMedicalHistory(customer.getMedicalHistory());
        return dto;
    }

    public void updateMyInfo(String email, UpdateCustomerDTO dto) {
        User user = userRepository.findByEmail(email);

        if (user == null) {
            throw new RuntimeException("không tìm tha người dùng");
        }

        Customer customer = customerRepository.findByUser(user);
        if (customer == null) {
            throw new RuntimeException("không tìm thấy khách hàng");
        }

        user.setName(dto.getName());
        user.setDob(LocalDate.parse(dto.getDob()));
        user.setGender(Genders.valueOf(dto.getGender()));
        user.setPhone(dto.getPhones());
        userRepository.save(user);

        customer.setMedicalHistory(dto.getMedicalHistory());
        customerRepository.save(customer);
    }

    @Transactional
    public void registerCustomer(RegisterCustomerDTO dto) {
        if (userRepository.existsByEmail(dto.getEmail())) {
            throw new RuntimeException("Email đã tồn tại");
        }

        Role customerRole = roleRepository.findByRoleName("CUSTOMER");
        if (customerRole == null) {
            throw new RuntimeException("Không tìm thấy role CUSTOMER");
        }

        User user = new User();
        user.setName(dto.getName());
        user.setEmail(dto.getEmail());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        user.setPhone(dto.getPhone());
        user.setDob(dto.getDob());
        user.setGender(dto.getGender());
        user.setRole(customerRole);
        user.setCreateAt(LocalDate.now());
        userRepository.save(user);

        Customer customer = new Customer();
        customer.setUser(user);
        customer.setActive(true);
        customer.setMedicalHistory(dto.getMedicalHistory());
        customerRepository.save(customer);
    }

    public Customer getCustomerById(int id) {
        Customer customer = customerRepository.findById(id).get();
        return customer;
    }

    public void sendMail(String to, String name) {

        String body = "<h1>Welcome, " + name + "!</h1>"
                + "<p>Welcome to FercilyCare.</p>";

        MimeMessage mimeMessage = mailSender.createMimeMessage();

        try {
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);
            helper.setTo(to);
            helper.setSubject("You have successfully registered!");
            helper.setText(body, true);
            mailSender.send(mimeMessage);
        } catch (MessagingException e) {
            throw new RuntimeException("Gửi email thất bại", e);
        }
    }
}