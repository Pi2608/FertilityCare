package hsf302.com.hiemmuon.config;

import hsf302.com.hiemmuon.entity.*;
import hsf302.com.hiemmuon.enums.Genders;
import hsf302.com.hiemmuon.repository.TreatmentServiceRepository;
import hsf302.com.hiemmuon.repository.TreatmentStepRepository;
import hsf302.com.hiemmuon.service.*;
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

    @Autowired
    private BlogService blogService;

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        if (userService.count() == 0) {
            seedRolesAndUsers();
            seedDoctors();
            seedTreatmentServices();
            seedBlogs();
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

    private void seedBlogs() {
        User doc1 = userService.findByEmail("ivf.doctor@example.com");
        User doc2 = userService.findByEmail("iui.doctor@example.com");
        User admin = userService.findByEmail("admin@gmail.com");

        blogService.save(new Blog(
                0, // blogId sẽ được tự động sinh bởi @GeneratedValue
                doc1,
                "Thụ tinh trong ống nghiệm (IVF) – Cơ hội mới cho các cặp vợ chồng vô sinh",
                "IVF (In Vitro Fertilization) là một bước tiến vượt bậc trong điều trị vô sinh. Đây là kỹ thuật trong đó trứng và tinh trùng được thụ tinh ngoài cơ thể, sau đó phôi được chuyển lại vào buồng tử cung. IVF thường được chỉ định trong các trường hợp ống dẫn trứng bị tắc, tinh trùng yếu hoặc sau khi IUI thất bại.\\n\\nQuy trình IVF bao gồm nhiều bước: kích thích buồng trứng, chọc hút trứng, thụ tinh trong ống nghiệm, nuôi phôi, và cuối cùng là chuyển phôi. Mỗi giai đoạn đều đòi hỏi sự theo dõi chặt chẽ từ bác sĩ chuyên môn và sự hợp tác của người bệnh.\\n\\nTỷ lệ thành công của IVF thường cao hơn IUI, dao động khoảng 40–60% tùy vào độ tuổi, chất lượng phôi, tình trạng nội mạc tử cung và chế độ sinh hoạt. Tuy nhiên, chi phí và áp lực tâm lý cũng lớn hơn. \\n\\nSự chuẩn bị tâm lý, thể chất và tài chính kỹ lưỡng là yếu tố cần thiết để quá trình IVF thành công và mang lại kết quả tốt nhất.",
                "IVF, thụ tinh ống nghiệm, hỗ trợ sinh sản",
                LocalDate.now().minusDays(7),
                150
        ));

        blogService.save(new Blog(
                0,
                doc2,
                "Hiểu đúng về phương pháp IUI trong điều trị hiếm muộn",
                "IUI (Intrauterine Insemination - Bơm tinh trùng vào buồng tử cung) là một trong những phương pháp hỗ trợ sinh sản phổ biến nhất hiện nay. Đây là kỹ thuật tương đối đơn giản và ít xâm lấn, được áp dụng trong nhiều trường hợp vô sinh không rõ nguyên nhân hoặc yếu tố nhẹ về tinh trùng.\\n\\nQuy trình IUI bắt đầu bằng việc kích thích buồng trứng để tăng khả năng rụng trứng. Sau đó, bác sĩ theo dõi nang noãn bằng siêu âm và xét nghiệm hormone để xác định thời điểm rụng trứng. Khi thời điểm thích hợp đến, tinh trùng được lọc rửa và bơm vào tử cung thông qua một ống thông mỏng. \\n\\nƯu điểm lớn nhất của IUI là thủ thuật đơn giản, chi phí thấp và ít tác dụng phụ. Tỷ lệ thành công dao động khoảng 10–20% mỗi chu kỳ, tùy theo độ tuổi và nguyên nhân vô sinh. Phương pháp này thường được chỉ định trước IVF nếu vợ chồng có buồng trứng và tinh trùng đạt mức tối thiểu.\\n\\nNếu sau 3–6 chu kỳ IUI mà không thành công, bác sĩ có thể đề nghị chuyển sang IVF để tăng cơ hội có thai.",
                "IUI, hỗ trợ sinh sản, vô sinh",
                LocalDate.now().minusDays(5),
                200
        ));

        blogService.save(new Blog(
                0,
                admin,
                "Tâm lý tích cực – Chìa khóa nâng cao hiệu quả điều trị vô sinh",
                "Nhiều nghiên cứu chỉ ra rằng yếu tố tâm lý ảnh hưởng đáng kể đến kết quả điều trị vô sinh. Căng thẳng, lo lắng hoặc trầm cảm có thể làm giảm hormone sinh sản và ảnh hưởng tiêu cực đến chu kỳ kinh nguyệt cũng như chất lượng tinh trùng.\\n\\nKhi đối mặt với hành trình điều trị kéo dài, các cặp vợ chồng dễ rơi vào trạng thái mệt mỏi, chán nản. Điều này không chỉ ảnh hưởng đến sức khỏe thể chất mà còn làm giảm hiệu quả điều trị. Do đó, việc giữ tâm lý tích cực, biết cách giảm stress, và đồng hành cùng nhau là rất quan trọng.\\n\\nMột số gợi ý hữu ích bao gồm: tham gia tư vấn tâm lý, tập yoga, thiền, chia sẻ với cộng đồng cùng hoàn cảnh hoặc đơn giản là cùng nhau đi dạo, ăn uống lành mạnh và ngủ đủ giấc.\\n\\nBên cạnh đó, việc lựa chọn bác sĩ và trung tâm điều trị uy tín, giao tiếp cởi mở với bác sĩ để hiểu rõ quá trình điều trị cũng giúp bệnh nhân giảm bớt lo lắng, tăng niềm tin và hy vọng.",
                "tâm lý, điều trị vô sinh, stress",
                LocalDate.now().minusDays(3),
                100
        ));

        blogService.save(new Blog(
                0,
                doc1,
                "Chế độ ăn uống giúp tăng khả năng thụ thai tự nhiên",
                "Dinh dưỡng là yếu tố quan trọng hỗ trợ sức khỏe sinh sản. Các nghiên cứu chỉ ra rằng chế độ ăn uống cân bằng giúp điều hòa hormone, cải thiện chất lượng trứng và tinh trùng.\\n\\nĐối với phụ nữ, nên bổ sung thực phẩm giàu folate, vitamin D, omega-3 như rau xanh, trứng, cá hồi, hạt óc chó, sữa chua và trái cây tươi. Tránh thực phẩm chiên, nhiều đường và đồ uống có cồn. \\n\\nĐối với nam giới, cần tăng cường kẽm, selenium và chất chống oxy hóa để tăng số lượng và chất lượng tinh trùng. Nên dùng thực phẩm như hàu, hạt bí, thịt đỏ nạc, và các loại quả mọng.\\n\\nUống đủ nước, tập thể dục điều độ, và tránh chất kích thích (thuốc lá, rượu, cà phê quá mức) cũng rất cần thiết.\\n\\nCuối cùng, duy trì chỉ số BMI ở mức hợp lý (18.5–24.9) giúp cải thiện nội tiết và khả năng thụ thai một cách tự nhiên.",
                "dinh dưỡng, thụ thai tự nhiên, sức khỏe sinh sản",
                LocalDate.now().minusDays(3),
                100
        ));

        blogService.save(new Blog(
                0,
                doc2,
                "Khi nào nên chuyển từ IUI sang IVF?",
                "Mặc dù IUI là phương pháp đơn giản và ít tốn kém, không phải lúc nào cũng mang lại kết quả mong đợi. Theo các chuyên gia, sau 3–6 chu kỳ IUI không thành công, cặp đôi nên cân nhắc chuyển sang IVF.\n\nCác yếu tố cần xem xét bao gồm: tuổi người vợ (trên 35 tuổi nên chuyển sớm), chất lượng tinh trùng kém, buồng trứng phản ứng yếu với thuốc kích thích, hoặc có tiền sử lạc nội mạc tử cung.\n\nIVF mang lại cơ hội cao hơn do có thể chọn lọc phôi chất lượng và can thiệp chính xác hơn trong quá trình tạo phôi. Ngoài ra, các kỹ thuật hỗ trợ như ICSI (tiêm tinh trùng vào bào tương trứng), xét nghiệm di truyền tiền làm tổ (PGT) cũng giúp tăng tỷ lệ thành công.\n\nViệc chuyển từ IUI sang IVF nên được quyết định bởi bác sĩ chuyên môn dựa trên từng trường hợp cụ thể để đảm bảo an toàn và hiệu quả cao nhất.",
                "IUI, IVF, chuyển phương pháp",
                LocalDate.now().minusDays(3),
                100
        ));
    }
}