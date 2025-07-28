package hsf302.com.hiemmuon;

import hsf302.com.hiemmuon.entity.*;
import hsf302.com.hiemmuon.enums.Genders;
import hsf302.com.hiemmuon.repository.RoleRepository;
import hsf302.com.hiemmuon.repository.TreatmentServiceRepository;
import hsf302.com.hiemmuon.repository.TreatmentStepRepository;
import hsf302.com.hiemmuon.repository.UserRepository;
import hsf302.com.hiemmuon.service.DoctorService;
import hsf302.com.hiemmuon.service.RoleService;
import hsf302.com.hiemmuon.service.SuccessRateByAgeService;
import hsf302.com.hiemmuon.service.UserService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@EnableScheduling
@SpringBootApplication(scanBasePackages = "hsf302.com.hiemmuon")
public class HiemMuonApplication {

    public static void main(String[] args) {
        SpringApplication.run(HiemMuonApplication.class, args);
    }


}