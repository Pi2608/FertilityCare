package hsf302.com.hiemmuon.dto.updateDto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@JsonIgnoreProperties(ignoreUnknown = false)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UpdateServiceDTO {

    @Size(max = 100, message = "Tên dịch vụ không được vượt quá 100 ký tự")
    private String name;

    @Size(max = 1000, message = "Mô tả không được vượt quá 1000 ký tự")
    private String description;

    @Size(max = 2000, message = "Thông tin đối tượng phù hợp không được vượt quá 2000 ký tự")
    private String targetPatient;

    @DecimalMin(value = "0.0", inclusive = true, message = "Tỷ lệ thành công phải từ 0% trở lên")
    @DecimalMax(value = "100.0", inclusive = true, message = "Tỷ lệ thành công không được vượt quá 100%")
    private Float successRate;

    @NotBlank(message = "Lợi ích không được để trống")
    private String benefit;

    @Size(max = 5000, message = "FAQ không được vượt quá 5000 ký tự")
    private String faq;

    @DecimalMin(value = "0.0", inclusive = false, message = "Giá tiền phải lớn hơn 0")
    private BigDecimal price;

    @Size(max = 1000, message = "Thông số kỹ thuật không được vượt quá 1000 ký tự")
    private String specifications;
}
