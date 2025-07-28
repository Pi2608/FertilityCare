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
        doctorService.saveDoctor(new Doctor(
                doc1,
                "Bác sĩ chuyên ngành Hỗ trợ sinh sản với hơn 15 năm kinh nghiệm, đặc biệt trong lĩnh vực thụ tinh trong ống nghiệm (IVF), luôn đồng hành cùng các cặp vợ chồng trong hành trình tìm kiếm thiên thần nhỏ của đời mình.",
                "Hỗ trợ sinh sản nâng cao, IVF, IUI, thụ tinh nhân tạo",
                "Đặt y đức và sự đồng cảm lên hàng đầu, kết hợp giữa khoa học hiện đại và sự thấu hiểu tâm lý bệnh nhân để mang đến phương pháp điều trị tối ưu và nhân văn.",
                15,
                "Chứng chỉ IVF quốc tế do Hiệp hội Sinh sản Châu Âu (ESHRE) cấp năm 2019, chứng chỉ Hỗ trợ sinh sản nâng cao tại Nhật Bản năm 2022, cùng nhiều khóa đào tạo chuyên sâu tại Mỹ và Úc.",
                "Tốt nghiệp loại Xuất sắc tại Đại học Y Hà Nội, chuyên ngành Sản Phụ khoa, sau đó hoàn thành chương trình Thạc sĩ Y học Sinh sản tại Đại học Monash – Úc.",
                "Hiện đang là Trưởng khoa Hỗ trợ sinh sản tại Bệnh viện IVF Quốc tế Hồng Lĩnh, từng là cố vấn chuyên môn tại Bệnh viện Phụ sản Trung ương, đồng thời là giảng viên thỉnh giảng tại Đại học Y Dược TP.HCM.",
                null
        ));

        userService.saveUser(new User(
                doctorRole, "BS. Trần Thị Minh Tâm", Genders.female,
                LocalDate.parse("1985-03-15"), "iui.doctor@example.com",
                "0911222333", encoder.encode("123456"),
                LocalDate.now(), null, true
        ));
        User doc2 = userService.findByEmail("iui.doctor@example.com");
        doctorService.saveDoctor(new Doctor(
                doc2,
                "Với hơn 15 năm kinh nghiệm điều trị hiếm muộn bằng phương pháp bơm tinh trùng vào buồng tử cung (IUI), bác sĩ không chỉ là người chữa bệnh mà còn là người bạn đồng hành trong từng khoảnh khắc mong chờ phép màu.",
                "Điều trị hiếm muộn bằng IUI, tư vấn tâm lý sinh sản, theo dõi nội tiết sinh sản nữ",
                "Luôn đặt bệnh nhân làm trung tâm, bác sĩ tin rằng sự thấu hiểu và đồng hành về mặt tâm lý chính là một phần quan trọng trong hiệu quả điều trị. Mỗi chu kỳ không chỉ là một liệu trình y khoa, mà còn là một hành trình cảm xúc thiêng liêng.",
                15,
                "Chứng chỉ điều trị IUI nâng cao được cấp bởi Bộ Y tế Việt Nam (2015), tham gia chương trình đào tạo chuyên sâu về hỗ trợ sinh sản tại Thái Lan (2018), chứng nhận tư vấn tâm lý sinh sản từ Hội đồng Y khoa Việt Nam (2020).",
                "Tốt nghiệp Đại học Y Dược TP.HCM, chuyên ngành Phụ sản; tiếp tục theo học các chương trình đào tạo chuyên sâu về nội tiết sinh sản và hỗ trợ sinh sản tại Nhật Bản và Singapore.",
                "Hiện đang là Trưởng khoa Hỗ trợ sinh sản tại Bệnh viện Phụ sản Tâm An, từng làm việc tại Bệnh viện Hùng Vương và là thành viên tích cực của Hội Nội tiết sinh sản TP.HCM.",
                null
        ));

        userService.saveUser(new User(
                doctorRole, "BS. Lê Quốc Hưng", Genders.male,
                LocalDate.parse("1982-07-20"), "endocrine.doctor@example.com",
                "0977665544", encoder.encode("123456"),
                LocalDate.now(), null, true
        ));
        User doc3 = userService.findByEmail("endocrine.doctor@example.com");
        doctorService.saveDoctor(new Doctor(doc3,
                "Chuyên gia về chẩn đoán di truyền tiền làm tổ (PGT), giúp phát hiện và sàng lọc các bất thường di truyền trước khi chuyển phôi.",
                "PGT", "Tin rằng mỗi phôi thai là một món quà, và nhiệm vụ của bác sĩ là đảm bảo món quà đó đến với thế giới khỏe mạnh.",
                20, "Chứng nhận quốc tế về PGT - Đại học Cambridge, Anh",
                "Đại học Y Dược Huế, chuyên ngành Di truyền học",
                "Nguyên trưởng bộ môn Di truyền học tại Viện Nghiên cứu Di truyền Quốc gia",
                null));
    }

    private void seedTreatmentServices() {
        TreatmentService iui = new TreatmentService(
                "IUI - Bơm tinh trùng vào buồng tử cung",
                "IUI là một phương pháp hỗ trợ sinh sản đơn giản nhưng hiệu quả, trong đó tinh trùng của người chồng được lọc rửa và chọn lọc để đảm bảo chất lượng tốt nhất, sau đó được bơm trực tiếp vào buồng tử cung của người vợ vào thời điểm rụng trứng. Quá trình này giúp tinh trùng đến gần trứng hơn, làm tăng khả năng thụ thai tự nhiên. Phương pháp này ít xâm lấn, không yêu cầu gây mê và thường được thực hiện ngay tại phòng khám trong thời gian ngắn.",
                "Phù hợp với các cặp vợ chồng hiếm muộn ở mức độ nhẹ, những trường hợp chưa rõ nguyên nhân vô sinh, rối loạn rụng trứng hoặc người chồng có tinh trùng hơi yếu nhưng vẫn đạt ngưỡng khả thi. Ngoài ra, IUI cũng có thể áp dụng cho các cặp đôi sử dụng tinh trùng hiến tặng.",
                25f,
                "Chi phí điều trị thấp hơn nhiều so với phương pháp thụ tinh trong ống nghiệm (IVF), thời gian thực hiện nhanh chóng, không cần phẫu thuật hay can thiệp sâu. IUI là lựa chọn lý tưởng cho những cặp đôi muốn bắt đầu hành trình tìm kiếm con yêu bằng một giải pháp nhẹ nhàng và ít rủi ro.",
                "IUI có đau không?\n Quá trình thực hiện thường không gây đau, chỉ hơi khó chịu nhẹ như khi khám phụ khoa.\n\n Có cần nằm viện không?\n Không. Sau khi thực hiện, người vợ có thể về ngay trong ngày, nghỉ ngơi nhẹ nhàng là đủ.\n\n Bao lâu thì có thể thử thai?\n Thông thường, có thể thử thai sau 14 ngày kể từ khi bơm tinh trùng.",
                new BigDecimal("50000000.00"),
                "Để thực hiện IUI hiệu quả, người vợ cần có ít nhất một vòi trứng thông thoáng và niêm mạc tử cung bình thường. Người chồng cần có tinh trùng đạt chất lượng tối thiểu sau khi lọc rửa. Phương pháp thường được thực hiện vào ngày rụng trứng, có thể kết hợp theo dõi siêu âm và thuốc kích thích nhẹ nếu cần thiết.",
                true
        );

        TreatmentService ivf = new TreatmentService(
                "IVF - Thụ tinh trong ống nghiệm",
                "IVF là phương pháp hỗ trợ sinh sản tiên tiến, trong đó trứng và tinh trùng được lấy ra khỏi cơ thể, sau đó được kết hợp với nhau trong môi trường phòng thí nghiệm để tạo thành phôi. Những phôi khỏe mạnh nhất sẽ được chọn lọc và chuyển vào buồng tử cung của người mẹ để bắt đầu quá trình mang thai. IVF cho phép theo dõi và kiểm soát từng bước trong quá trình thụ tinh, giúp tăng khả năng đậu thai, đặc biệt trong những trường hợp hiếm muộn nghiêm trọng.",
                "Phù hợp cho các cặp vợ chồng hiếm muộn ở mức độ nặng, bao gồm: phụ nữ bị tắc vòi trứng, suy giảm chức năng buồng trứng, nam giới có tinh trùng yếu hoặc dị dạng, các trường hợp thất bại với phương pháp IUI, hoặc những cặp đôi sử dụng phôi đông lạnh hoặc tinh trùng hiến tặng. IVF cũng là lựa chọn phổ biến cho phụ nữ lớn tuổi mong muốn mang thai.",
                50f,
                "Tỷ lệ thành công cao hơn so với các phương pháp hỗ trợ sinh sản khác. Cho phép lựa chọn phôi chất lượng tốt nhất, tăng cơ hội mang thai khỏe mạnh. IVF cũng hỗ trợ kiểm tra di truyền tiền làm tổ (PGT), giúp phát hiện bất thường nhiễm sắc thể từ sớm. Đặc biệt, phương pháp này có thể lưu trữ trứng, tinh trùng hoặc phôi để sử dụng sau này.",
                "IVF có đau không?\n Việc chọc hút trứng sẽ được gây mê nhẹ nên hầu như không gây đau. Sau thủ thuật có thể hơi khó chịu bụng nhẹ.\n\n Có cần nằm viện không?\n Không. Hầu hết các bước đều được thực hiện ngoại trú, chỉ cần nghỉ ngơi một thời gian ngắn tại cơ sở y tế sau mỗi lần làm thủ thuật.\n\n Bao nhiêu lần thì thành công?\n Trung bình, cần 1–3 chu kỳ IVF để đạt được thai kỳ thành công, tùy theo độ tuổi và sức khỏe sinh sản của từng người.",
                new BigDecimal("80000000.00"),
                "Quy trình IVF bao gồm các bước chính: kích thích buồng trứng bằng thuốc để tạo nhiều trứng, sau đó chọc hút trứng (gây mê nhẹ), kết hợp trứng và tinh trùng trong phòng lab, nuôi phôi từ 3–5 ngày, chọn lọc phôi tốt và chuyển vào tử cung. Trong suốt quá trình, người vợ cần theo dõi sát với bác sĩ và thực hiện siêu âm, xét nghiệm định kỳ để đảm bảo hiệu quả điều trị.",
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
