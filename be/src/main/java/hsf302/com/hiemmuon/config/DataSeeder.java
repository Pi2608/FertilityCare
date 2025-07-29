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

    @Autowired
    private CustomerService customerService;

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        if (userService.count() == 0) {
            seedRolesAndUsers();
            seedDoctors();
            seedTreatmentServices();
            seedBlogs();
            seedCustomers();
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

    public void seedCustomers(){
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        Role customerRole = roleService.findByName("customer");
        userService.saveUser(new User(
                customerRole, "Minh Hieu", Genders.male,
                LocalDate.parse("1990-01-01"), "customer@gmail.com",
                "12345678", encoder.encode("customer123"),
                LocalDate.now(), null, true
        ));
        User cus1 = userService.getUserByEmail("customer@gmail.com");
        customerService.saveCustomer(new Customer(
                cus1,
                "Khoe manh"
        ));
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
                // --- IUI ---
                new TreatmentStep(iui, 1, "Khám và xét nghiệm ban đầu",
                        "Bác sĩ tiến hành thăm khám sức khỏe sinh sản tổng quát cho cả vợ và chồng, bao gồm: siêu âm tử cung và buồng trứng, xét nghiệm nội tiết tố, tinh dịch đồ, và các xét nghiệm cần thiết khác. Mục tiêu là đánh giá chính xác nguyên nhân gây hiếm muộn và lựa chọn thời điểm can thiệp phù hợp.",
                        2),

                new TreatmentStep(iui, 2, "Kích thích buồng trứng",
                        "Người vợ sẽ được chỉ định dùng thuốc kích thích nhẹ để tăng khả năng rụng trứng. Quá trình này được theo dõi sát sao bằng siêu âm và xét nghiệm nội tiết nhằm đảm bảo sự phát triển của nang noãn một cách an toàn và hiệu quả.",
                        5),

                new TreatmentStep(iui, 3, "Theo dõi nang noãn và tiêm rụng trứng",
                        "Khi nang noãn đạt đến kích thước phù hợp, bác sĩ sẽ tiêm hormone hCG để kích thích rụng trứng. Thời điểm này rất quan trọng, quyết định sự thành công của việc bơm tinh trùng, do đó cần theo dõi chính xác và đúng giờ.",
                        3),

                new TreatmentStep(iui, 4, "Lọc rửa tinh trùng và tiến hành bơm",
                        "Tinh trùng của người chồng được lấy mẫu và xử lý bằng phương pháp lọc rửa để chọn ra những tinh trùng khỏe mạnh nhất. Sau đó, chúng được bơm trực tiếp vào buồng tử cung bằng ống thông nhỏ, không gây đau và chỉ mất vài phút.",
                        1),

                new TreatmentStep(iui, 5, "Nghỉ ngơi và thử thai",
                        "Sau khi bơm, người vợ sẽ được hướng dẫn nghỉ ngơi nhẹ nhàng tại chỗ. Trong vòng 14 ngày tiếp theo, cần hạn chế căng thẳng và theo dõi dấu hiệu có thai. Sau đó, có thể thử thai bằng que thử hoặc xét nghiệm máu theo chỉ định bác sĩ.",
                        14),

                // --- IVF ---
                new TreatmentStep(ivf, 1, "Khám và đánh giá",
                        "Cặp vợ chồng được khám tổng quát để đánh giá khả năng sinh sản: nội tiết tố, dự trữ buồng trứng, cấu trúc tử cung, ống dẫn trứng và chất lượng tinh trùng. Giai đoạn này là nền tảng để xây dựng phác đồ IVF phù hợp và tối ưu hóa tỉ lệ thành công.",
                        2),

                new TreatmentStep(ivf, 2, "Kích thích buồng trứng",
                        "Người vợ sẽ được tiêm hormone kích thích để buồng trứng phát triển nhiều nang noãn cùng lúc. Quá trình kéo dài khoảng 8–12 ngày, với các buổi siêu âm và xét nghiệm để theo dõi kích thước nang, điều chỉnh liều thuốc phù hợp nhằm đảm bảo chất lượng trứng thu được.",
                        10),
                new TreatmentStep(ivf, 3, "Chọc hút trứng",
                        "Khi nang noãn đạt kích thước tối ưu, bác sĩ sẽ tiến hành chọc hút trứng qua ngả âm đạo dưới hướng dẫn siêu âm. Thủ thuật được thực hiện nhanh chóng, trong điều kiện gây mê nhẹ và hoàn toàn không gây đau đớn.",
                        1),

                new TreatmentStep(ivf, 4, "Tạo phôi và nuôi phôi",
                        "Trứng sau khi chọc hút sẽ được thụ tinh với tinh trùng trong phòng lab hiện đại. Các phôi sau đó được nuôi cấy từ 3–5 ngày, dưới sự giám sát nghiêm ngặt để chọn lọc những phôi phát triển tốt nhất. Đây là giai đoạn quan trọng đòi hỏi kỹ thuật cao và môi trường tối ưu.",
                        5),

                new TreatmentStep(ivf, 5, "Chuyển phôi",
                        "Một hoặc vài phôi chất lượng tốt sẽ được chuyển vào buồng tử cung bằng một ống catheter mềm. Quá trình diễn ra nhẹ nhàng, không đau và không cần gây mê. Người vợ sau đó được khuyên nghỉ ngơi để hỗ trợ quá trình làm tổ của phôi.",
                        1),

                new TreatmentStep(ivf, 6, "Thử thai",
                        "Khoảng 14 ngày sau chuyển phôi, người vợ sẽ được xét nghiệm máu để kiểm tra nồng độ beta-hCG nhằm xác định có thai hay chưa. Nếu có thai, bác sĩ sẽ tiếp tục theo dõi thai kỳ sớm để đảm bảo an toàn cho mẹ và bé.",
                        14)
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
        System.out.println("luu thanh cong");
    }

}
