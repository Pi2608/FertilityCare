package hsf302.com.hiemmuon.dto.createDto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@JsonIgnoreProperties(ignoreUnknown = false)
@Getter
@Setter
public class CreateTreatmentServiceDTO {

    @NotBlank(message = "Tên dịch vụ không được để trống")
    @Size(max = 100, message = "Tên dịch vụ không được vượt quá 100 ký tự")
    private String name;

    @NotBlank(message = "Mô tả không được để trống")
    @Size(max = 1000, message = "Mô tả không được vượt quá 1000 ký tự")
    private String description;

    @NotNull(message = "Tỉ lệ thành công không được để trống")
    @DecimalMin(value = "0.0", inclusive = true, message = "Tỉ lệ thành công không được âm")
    @DecimalMax(value = "100.0", inclusive = true, message = "Tỉ lệ thành công không vượt quá 100%")
    private Float successRate;

    @Positive(message = "Giá phải là số dương")
    @NotNull(message = "Giá không được để trống")
    private BigDecimal price;

    @Size(max = 1000, message = "Thông số kỹ thuật không được vượt quá 1000 ký tự")
    private String specifications;

    @Size(max = 2000, message = "Thông tin đối tượng phù hợp không được vượt quá 2000 ký tự")
    private String targetPatient;

    @NotBlank(message = "Lợi ích không được để trống")
    private String benefit;

    @Size(max = 5000, message = "FAQ không được vượt quá 5000 ký tự")
    private String faq;

    @NotNull(message = "Trạng thái hoạt động không được để trống")
    private Boolean isActive;
}
