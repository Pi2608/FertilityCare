package hsf302.com.hiemmuon.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@OpenAPIDefinition(
        tags = {
                @Tag(name = "1. Login Controller", description = "Xác thực và phân quyền người dùng"),
                @Tag(name = "2. Appointment Controller", description = "Lịch hẹn giữa bác sĩ và bệnh nhân"),
                @Tag(name = "3. Test Result Controller", description = "Kết quả xét nghiệm trong quá trình điều trị"),
                @Tag(name = "4. Payment Controller", description = "Thanh toán dịch vụ hiếm muộn"),
                @Tag(name = "5. Cycle Controller", description = "Chu kỳ điều trị"),
                @Tag(name = "6. Cycle Step Controller", description = "Các bước điều trị trong chu kỳ"),
                @Tag(name = "7. Medicine Schedule Controller", description = "Lịch uống thuốc và theo dõi"),
                @Tag(name = "8. Service Controller", description = "Dịch vụ hỗ trợ sinh sản (IUI, IVF...)"),
                @Tag(name = "9. Service Step Controller", description = "Các bước trong dịch vụ hỗ trợ sinh sản"),
                @Tag(name = "10. Success Rate Controller", description = "Tỷ lệ thành công theo độ tuổi và dịch vụ"),
                @Tag(name = "11. Customer Controller", description = "Quản lý thông tin bệnh nhân"),
                @Tag(name = "12. Doctor Controller", description = "Quản lý thông tin bác sĩ"),
                @Tag(name = "13. Report Controller", description = "Báo cáo thống kê hệ thống"),
                @Tag(name = "14. Feedback Controller", description = "Quản lý phản hồi và đánh giá của người dùng"),
                @Tag(name = "15. Message Controller", description = "Hệ thống nhắn tin giữa người dùng"),
                @Tag(name = "16. Blog Controller", description = "Quản lý blog và thông tin y tế"),
        }
)
@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        final String securitySchemeName = "bearerAuth";

        return new OpenAPI()
                .info(new Info()
                        .title("Hệ thống Quản lý Y tế")
                        .version("1.0")
                        .description("Tài liệu API cho hệ thống quản lý y tế")
                        .license(new License().name("API License").url("http://domain.com/license")))
                .servers(List.of(
                        new Server().url("http://localhost:8080").description("Localhost")
                ))
                .addSecurityItem(new SecurityRequirement().addList(securitySchemeName))
                .components(new Components()
                        .addSecuritySchemes(securitySchemeName,
                                new SecurityScheme()
                                        .name(securitySchemeName)
                                        .type(SecurityScheme.Type.HTTP)
                                        .scheme("bearer")
                                        .bearerFormat("JWT")));
    }
}