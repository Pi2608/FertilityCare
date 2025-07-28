package hsf302.com.hiemmuon.config;

import hsf302.com.hiemmuon.entity.*;
import hsf302.com.hiemmuon.enums.Genders;
import hsf302.com.hiemmuon.repository.TreatmentServiceRepository;
import hsf302.com.hiemmuon.repository.TreatmentStepRepository;
import hsf302.com.hiemmuon.service.DoctorService;
import hsf302.com.hiemmuon.service.RoleService;
import hsf302.com.hiemmuon.service.SuccessRateByAgeService;
import hsf302.com.hiemmuon.service.UserService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {

    @Autowired
    private UserService userService;

    @Autowired
    private RoleService roleService;

    @Autowired
    private DoctorService doctorService;

    @Autowired
    private TreatmentServiceRepository treatmentServiceRepository;

    @Autowired
    private TreatmentStepRepository treatmentStepRepository;

    @Autowired
    private SuccessRateByAgeService successRateByAgeService;

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        if (userService.count() == 0) {
            seedRolesAndUsers();
            seedDoctors();
            seedTreatmentServices();
        }
    }

    private void seedRolesAndUsers() {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        Role admin = roleService.save(new Role("admin"));
        userService.saveUser(new User(
                admin, "admin", Genders.male,
                LocalDate.parse("1990-01-01"), "admin@gmail.com",
                "1234567890", encoder.encode("admin123"),
                LocalDate.now(), null, true
        ));

        Role manager = roleService.save(new Role("manager"));
        userService.saveUser(new User(
                manager, "manager", Genders.female,
                LocalDate.parse("1990-01-01"), "manager@gmail.com",
                "0987654321", encoder.encode("manager123"),
                LocalDate.now(), null, true
        ));

        roleService.save(new Role("doctor"));
        roleService.save(new Role("customer"));
    }

    private void seedDoctors() {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        Role doctorRole = roleService.findByName("doctor");

        userService.saveUser(new User(
                doctorRole, "BS. Nguyễn Văn Phôi", Genders.male,
                LocalDate.parse("1990-01-01"), "ivf.doctor@example.com",
                "12345678", encoder.encode("123456"),
                LocalDate.now(), null, true
        ));
        User doc1 = userService.findByEmail("ivf.doctor@example.com");
        doctorService.saveDoctor(new Doctor(doc1,
                "Chuyên gia về thụ tinh trong ống nghiệm với hơn 12 năm kinh nghiệm.",
                "IVF", "Tập trung vào chất lượng phôi và sức khỏe bệnh nhân.",
                12, "Chứng chỉ IVF quốc tế - ESHRE 2019",
                "Đại học Y Hà Nội, chuyên ngành Hỗ trợ sinh sản",
                "Trưởng khoa IVF tại Bệnh viện A, cố vấn chuyên môn tại Bệnh viện B",
                null));

        userService.saveUser(new User(
                doctorRole, "BS. Trần Thị Minh Tâm", Genders.female,
                LocalDate.parse("1985-03-15"), "iui.doctor@example.com",
                "0911222333", encoder.encode("123456"),
                LocalDate.now(), null, true
        ));
        User doc2 = userService.findByEmail("iui.doctor@example.com");
        doctorService.saveDoctor(new Doctor(doc2,
                "Hơn 15 năm kinh nghiệm trong lĩnh vực điều trị hiếm muộn bằng IUI.",
                "IUI", "Luôn lắng nghe và đồng hành cùng bệnh nhân trong từng chu kỳ.",
                15, "Chứng chỉ IUI nâng cao - Bộ Y tế Việt Nam",
                "Đại học Y Dược TP.HCM, chuyên ngành Phụ sản",
                "Trưởng khoa Hỗ trợ sinh sản tại Bệnh viện Phụ sản Tâm An",
                null));

        userService.saveUser(new User(
                doctorRole, "BS. Lê Quốc Hưng", Genders.male,
                LocalDate.parse("1982-07-20"), "endocrine.doctor@example.com",
                "0977665544", encoder.encode("123456"),
                LocalDate.now(), null, true
        ));
        User doc3 = userService.findByEmail("endocrine.doctor@example.com");
        doctorService.saveDoctor(new Doctor(doc3,
                "Chuyên gia nội tiết sinh sản, điều trị các bệnh lý ảnh hưởng khả năng thụ thai.",
                "IUI", "Kết hợp điều trị nội khoa và hỗ trợ tâm lý để nâng cao tỷ lệ thành công.",
                18, "Chứng chỉ Nội tiết học sinh sản - Đại học Y Harvard",
                "Đại học Y Hà Nội, chuyên ngành Nội tiết",
                "Cố vấn nội tiết tại Trung tâm IVF Việt Pháp",
                null));
    }

    private void seedTreatmentServices() {
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

        treatmentStepRepository.saveAll(List.of(
                new TreatmentStep(iui, 1, "Khám và xét nghiệm ban đầu", "Bác sĩ tiến hành thăm khám sức khỏe sinh sản tổng quát...", 2),
                new TreatmentStep(iui, 2, "Kích thích buồng trứng", "Sử dụng thuốc kích thích rụng trứng nhẹ...", 5),
                new TreatmentStep(iui, 3, "Theo dõi nang noãn và tiêm rụng trứng", "Bác sĩ theo dõi nang noãn qua siêu âm...", 3),
                new TreatmentStep(iui, 4, "Lọc rửa tinh trùng và tiến hành bơm", "Mẫu tinh trùng được lọc rửa...", 1),
                new TreatmentStep(iui, 5, "Nghỉ ngơi và thử thai", "Sau bơm, bệnh nhân nghỉ ngơi...", 14),

                new TreatmentStep(ivf, 1, "Khám và đánh giá", "Bác sĩ kiểm tra sức khỏe sinh sản tổng quát...", 2),
                new TreatmentStep(ivf, 2, "Kích thích buồng trứng", "Sử dụng hormone kích thích để buồng trứng phát triển...", 10),
                new TreatmentStep(ivf, 3, "Chọc hút trứng", "Khi nang noãn đạt đủ kích thước, bác sĩ chọc hút trứng...", 1),
                new TreatmentStep(ivf, 4, "Tạo phôi và nuôi phôi", "Trứng và tinh trùng được kết hợp trong phòng lab...", 5),
                new TreatmentStep(ivf, 5, "Chuyển phôi", "Phôi khỏe mạnh được chọn lọc và chuyển vào tử cung...", 1),
                new TreatmentStep(ivf, 6, "Thử thai", "Sau khoảng 14 ngày từ ngày chuyển phôi...", 14)
        ));

        successRateByAgeService.saveAll(List.of(
                new SuccessRateByAge("Dưới 35 tuổi", 65f, "+8% cao hơn", iui),
                new SuccessRateByAge("35-37 tuổi", 55f, "+7% cao hơn", iui),
                new SuccessRateByAge("38-40 tuổi", 45f, "+6% cao hơn", iui),
                new SuccessRateByAge("41-42 tuổi", 28f, "+4% cao hơn", iui)
        ));

        successRateByAgeService.saveAll(List.of(
                new SuccessRateByAge("Dưới 35 tuổi", 75f, "+10% cao hơn", ivf),
                new SuccessRateByAge("35-37 tuổi", 65f, "+9% cao hơn", ivf),
                new SuccessRateByAge("38-40 tuổi", 55f, "+7% cao hơn", ivf),
                new SuccessRateByAge("41-42 tuổi", 40f, "+5% cao hơn", ivf)
        ));
    }
}
