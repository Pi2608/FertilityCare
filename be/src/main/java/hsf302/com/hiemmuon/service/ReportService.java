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

    @Autowired
    private AdminRepository   adminRepository;

    @Autowired
    private ManagerRepository managerRepository;

    public Map<String, Object> getAccountStats() {
        long totalDoctors = reportRepository.countTotalDoctors();
        long activeDoctors = reportRepository.countActiveDoctors();
        long newDoctorsThisMonth = reportRepository.countNewActiveDoctorsThisMonth();

        long totalCustomers = reportRepository.countTotalCustomers();
        long activeCustomers = reportRepository.countActiveCustomers();
        long newCustomersThisMonth = reportRepository.countNewActiveCustomersThisMonth();

        long total = totalDoctors + totalCustomers;
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
        long patients = customerRepository.countAllCustomers();
        long doctors = doctorRepository.countAllDoctors();
        long admins = adminRepository.countAllAdmins();
        long managers = managerRepository.countAllManagers();

        long active = customerRepository.countActiveCustomers()
                + doctorRepository.countActiveDoctors()
                + adminRepository.countActiveAdmins()
                + managerRepository.countActiveManagers();

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
