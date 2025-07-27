package hsf302.com.hiemmuon;

import hsf302.com.hiemmuon.entity.Role;
import hsf302.com.hiemmuon.entity.TreatmentService;
import hsf302.com.hiemmuon.entity.TreatmentStep;
import hsf302.com.hiemmuon.entity.User;
import hsf302.com.hiemmuon.enums.Genders;
import hsf302.com.hiemmuon.repository.RoleRepository;
import hsf302.com.hiemmuon.repository.TreatmentServiceRepository;
import hsf302.com.hiemmuon.repository.TreatmentStepRepository;
import hsf302.com.hiemmuon.repository.UserRepository;
import hsf302.com.hiemmuon.service.RoleService;
import hsf302.com.hiemmuon.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.math.BigDecimal;
import java.time.LocalDate;

@EnableScheduling
@SpringBootApplication(scanBasePackages = "hsf302.com.hiemmuon")
public class HiemMuonApplication implements CommandLineRunner {

    public static void main(String[] args) {
        SpringApplication.run(HiemMuonApplication.class, args);
    }

    @Autowired
    private UserService userService;

    @Autowired
    private RoleService roleService;

    @Autowired
    private TreatmentServiceRepository treatmentServiceRepository;

    @Autowired
    private TreatmentStepRepository treatmentStepRepository;

    @Override
    public void run(String... args) throws Exception {
        if (userService.count() == 0) {
            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

            Role admin = roleService.save(new Role("admin"));
            Role manager = roleService.save(new Role("manager"));
            Role doctor = roleService.save(new Role("doctor"));
            Role customerRole = roleService.save(new Role("customer"));

            userService.saveUser(new User(
                    admin,
                    "admin",
                    Genders.male,
                    LocalDate.parse("1990-01-01"),
                    "admin@gmail.com",
                    "1234567890",
                    encoder.encode("admin123"),
                    LocalDate.now(),
                    LocalDate.now()
            ));

            userService.saveUser(new User(
                    manager,
                    "manager",
                    Genders.female,
                    LocalDate.parse("1990-01-01"),
                    "manager@gmail.com",
                    "0987654321",
                    encoder.encode("manager123"),
                    LocalDate.now(),
                    LocalDate.now()
            ));


            TreatmentService iui = new TreatmentService(
                    "IUI - Bơm tinh trùng vào buồng tử cung",
                    "Phương pháp hỗ trợ sinh sản bằng cách bơm tinh trùng đã lọc rửa vào buồng tử cung...",
                    "Các cặp vợ chồng hiếm muộn nhẹ hoặc nguyên nhân không rõ ràng",
                    0.25f,
                    "Ít xâm lấn, chi phí thấp hơn IVF, thời gian thực hiện nhanh",
                    "IUI có đau không? Có cần nằm viện không? Bao lâu thì có thể thử thai?",
                    new BigDecimal("5000000.00"),
                    "Thực hiện vào ngày rụng trứng, yêu cầu tinh trùng khỏe mạnh và tử cung bình thường",
                    true
            );
            TreatmentService ivf = new TreatmentService(
                    "IVF - Thụ tinh trong ống nghiệm",
                    "Phương pháp hỗ trợ sinh sản bằng cách lấy trứng và tinh trùng ra ngoài cơ thể để thụ tinh trong ống nghiệm, sau đó chuyển phôi vào tử cung.",
                    "Các cặp vợ chồng hiếm muộn nặng, tắc vòi trứng, suy buồng trứng, tinh trùng yếu, hoặc thất bại với IUI",
                    0.50f,
                    "Tỷ lệ thành công cao hơn, có thể chọn lọc phôi khỏe mạnh, phù hợp với nhiều nguyên nhân hiếm muộn",
                    "IVF có đau không? Có cần nằm viện không? Bao nhiêu lần là thành công?",
                    new BigDecimal("80000000.00"),
                    "Yêu cầu kích thích buồng trứng, gây mê để chọc hút trứng, và theo dõi phôi trong phòng lab",
                    true
            );

            treatmentServiceRepository.save(iui);
            treatmentServiceRepository.save(ivf);


            treatmentStepRepository.save(new TreatmentStep(iui, 1, "Khám và xét nghiệm ban đầu", "Bác sĩ tiến hành thăm khám sức khỏe sinh sản tổng quát...", 2));
            treatmentStepRepository.save(new TreatmentStep(iui, 2, "Kích thích buồng trứng", "Sử dụng thuốc kích thích rụng trứng nhẹ...", 5));
            treatmentStepRepository.save(new TreatmentStep(iui, 3, "Theo dõi nang noãn và tiêm rụng trứng", "Bác sĩ theo dõi nang noãn qua siêu âm...", 3));
            treatmentStepRepository.save(new TreatmentStep(iui, 4, "Lọc rửa tinh trùng và tiến hành bơm", "Mẫu tinh trùng được lọc rửa...", 1));
            treatmentStepRepository.save(new TreatmentStep(iui, 5, "Nghỉ ngơi và thử thai", "Sau bơm, bệnh nhân nghỉ ngơi...", 14));

            treatmentStepRepository.save(new TreatmentStep(ivf, 1, "Khám và đánh giá", "Bác sĩ kiểm tra sức khỏe sinh sản tổng quát...", 2));
            treatmentStepRepository.save(new TreatmentStep(ivf, 2, "Kích thích buồng trứng", "Sử dụng hormone kích thích để buồng trứng phát triển...", 10));
            treatmentStepRepository.save(new TreatmentStep(ivf, 3, "Chọc hút trứng", "Khi nang noãn đạt đủ kích thước, bác sĩ chọc hút trứng...", 1));
            treatmentStepRepository.save(new TreatmentStep(ivf, 4, "Tạo phôi và nuôi phôi", "Trứng và tinh trùng được kết hợp trong phòng lab...", 5));
            treatmentStepRepository.save(new TreatmentStep(ivf, 5, "Chuyển phôi", "Phôi khỏe mạnh được chọn lọc và chuyển vào tử cung...", 1));
            treatmentStepRepository.save(new TreatmentStep(ivf, 6, "Thử thai", "Sau khoảng 14 ngày từ ngày chuyển phôi...", 14));
        }
    }
}