package hsf302.com.hiemmuon.service.impl;

import hsf302.com.hiemmuon.dto.CustomerDTO;
import hsf302.com.hiemmuon.dto.RegisterCustomerDTO;
import hsf302.com.hiemmuon.dto.UpdateCustomerDTO;
import hsf302.com.hiemmuon.entity.Customer;
import hsf302.com.hiemmuon.entity.Role;
import hsf302.com.hiemmuon.entity.User;
import hsf302.com.hiemmuon.enums.Genders;
import hsf302.com.hiemmuon.repository.CustomerRepository;
import hsf302.com.hiemmuon.repository.RoleRepository;
import hsf302.com.hiemmuon.repository.UserRepository;
import hsf302.com.hiemmuon.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CustomerServiceImpl implements CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;


    @Override
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

    @Override
    public CustomerDTO getMyInfo(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("không tìm thấy user"));


        Customer customer = customerRepository.findByUser(user);
        if(customer == null) throw new RuntimeException("Không tìm tháy customer");

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

    @Override
    public void updateMyInfo(String email, UpdateCustomerDTO dto) {
        User user = userRepository.GetByEmail(email);

        if(user == null){
            throw new RuntimeException("không tìm tha người dùng");
        }

        Customer customer = customerRepository.findByUser(user);
        if(customer == null){
            throw new RuntimeException("không tìm thấy khách hàng");
        }

        user.setName(dto.getName());
        user.setEmail(dto.getEmail());
        user.setDob(LocalDate.parse(dto.getDob()));
        user.setGender(Genders.valueOf(dto.getGender()));
        user.setPhone(dto.getPhones());
        userRepository.save(user);

        customer.setMedicalHistory(dto.getMedicalHistory());
        customerRepository.save(customer);
    }

    @Override
    public Void registerCustomer(RegisterCustomerDTO dto) {
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
        return null;
    }

    public User createUser(User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new IllegalArgumentException("Email already exists");
        }
        userRepository.save(user);

        return user;
    }




}
