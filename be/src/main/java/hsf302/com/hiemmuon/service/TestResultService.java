package hsf302.com.hiemmuon.service;

import hsf302.com.hiemmuon.dto.testresult.CreateTestResultDTO;
import hsf302.com.hiemmuon.dto.testresult.TestResultViewDTO;
import hsf302.com.hiemmuon.dto.testresult.UpdateTestResultDTO;
import hsf302.com.hiemmuon.entity.*;
import hsf302.com.hiemmuon.repository.AppointmentRepository;
import hsf302.com.hiemmuon.repository.CustomerRepository;
import hsf302.com.hiemmuon.repository.TestResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class TestResultService {
    @Autowired
    private TestResultRepository testResultRepository;

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private CustomerRepository customerRepository;

    public void createTestResult(CreateTestResultDTO dto){
        Appointment appointment = appointmentRepository.findById(dto.getAppointmentId());
            if(appointment == null){
                System.out.println("khong tim thay appointment");
            }
        TestResult result = new TestResult(
                dto.getName(),
                dto.getValue(),
                dto.getUnit(),
                dto.getReferenceRange(),
                dto.getTestDate(),
                dto.getNote(),
                appointment
        );
        testResultRepository.save(result);
    }


    public List<TestResultViewDTO> getResultsForCustomer() {
        // Lấy email từ security context
        String email = SecurityContextHolder.getContext().getAuthentication().getName();

        // Tìm user theo email
        User user = userService.getUserByEmail(email);
        if (user == null) {
            System.out.println("Không tìm thấy người dùng với email: " + email);
            return Collections.emptyList(); // hoặc throw exception nếu cần
        }

        // Tìm customer từ user
        Customer customer = customerRepository.findByUser(user);
        if (customer == null) {
            System.out.println("Không tìm thấy thông tin khách hàng cho user: " + user.getUserId());
            return Collections.emptyList(); // hoặc throw exception nếu cần
        }

        // Trả về danh sách kết quả xét nghiệm
        return testResultRepository.findAllByCustomerId(customer.getCustomerId());
    }

    public void updateTestResult(int id, UpdateTestResultDTO dto){
        TestResult result = testResultRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy kết quả xét nghiệm"));

        result.setName(dto.getName());
        result.setValue(dto.getValue());
        result.setUnit(dto.getUnit());
        result.setReferenceRange(dto.getReferenceRange());
        result.setTestDate(dto.getTestDate());
        result.setNote(dto.getNote());

        testResultRepository.save(result);
    }
}
