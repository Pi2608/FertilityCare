package hsf302.com.hiemmuon.service;


import hsf302.com.hiemmuon.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class ReportService {


    @Autowired
    private ReportRepository reportRepository;

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private DoctorRepository   doctorRepository;

    @Autowired
    private CustomerRepository customerRepository;



    public Map<String, Object> getAccountStats() {
        long patients = customerRepository.findAll().size();
        long doctors = doctorRepository.findAll().size();
        long activeDoctors = doctorRepository.findByUser_IsActive(true).size();
        long activeCustomers = customerRepository.findByUser_IsActive(true).size();

        long newDoctorsThisMonth = reportRepository.countNewActiveDoctorsThisMonth();
        long newCustomersThisMonth = reportRepository.countNewActiveCustomersThisMonth();

        long total = doctors + patients;
        long active = activeDoctors + activeCustomers;
        long inactive = total - active;
        long increaseThisMonth = newDoctorsThisMonth + newCustomersThisMonth;

        double activePercent = total == 0 ? 0 : ((double) active / total) * 100;
        double inactivePercent = total == 0 ? 0 : ((double) inactive / total) * 100;

        Map<String, Object> result = new HashMap<>();
        result.put("total", total);
        result.put("active", active);
        result.put("inactive", inactive);
        result.put("increaseThisMonth", increaseThisMonth);
        result.put("activePercent", Math.round(activePercent * 10.0) / 10.0);    // làm tròn 1 chữ số
        result.put("inactivePercent", Math.round(inactivePercent * 10.0) / 10.0);

        return result;
    }



    public Map<String, Object> getMonthlyRevenue() {
        Long revenue = paymentRepository.getRevenueThisMonth();
        Map<String, Object> result = new HashMap<>();
        result.put("revenue", revenue != null ? revenue : 0);
        return result;
    }


    public Map<String, Object> getUserStatistics() {
        long total = reportRepository.countAllUsers();
        long patients = reportRepository.countByRole(4);
        long doctors = reportRepository.countByRole(3);
        long admins = reportRepository.countByRole(1);
        long managers = reportRepository.countByRole(2);



        Map<String, Object> stats = new HashMap<>();
        stats.put("totalUsers", total);
        stats.put("patients", patients);
        stats.put("doctors", doctors);
        stats.put("admins", admins);

        return stats;
    }



    public Map<String, Object> getUserStats() {
        long patients = customerRepository.findAll().size();
        long doctors = doctorRepository.findAll().size();
        long admins = userRepository.countUserByRole_RoleId(1);
        long managers = userRepository.countUserByRole_RoleId(2);

        long active = customerRepository.findByUser_IsActive(true).size()
                + doctorRepository.findByUser_IsActive(true).size()
                + userRepository.countUserByRole_RoleIdAndIsActive(1,true)
                + userRepository.countUserByRole_RoleIdAndIsActive(2,true);

        long total = patients + doctors + admins + managers;
        double activeRate = total == 0 ? 0 : ((double) active / total) * 100;

        Map<String, Object> res = new HashMap<>();
        res.put("patients", patients);
        res.put("doctors", doctors);
        res.put("managers", managers);
        res.put("admins", admins);
        res.put("total", total);
        res.put("activeRate", Math.round(activeRate * 10.0) / 10.0);
        return res;
    }
}
