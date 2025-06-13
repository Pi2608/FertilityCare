package hsf302.com.hiemmuon.dto;

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
    @Size(max = 500, message = "Mô tả không được vượt quá 500 ký tự")
    private String description;

    @NotNull(message = "Tỉ lệ thành công không được để trống")
    @DecimalMin(value = "0.0", inclusive = true, message = "Tỉ lệ thành công không được âm")
    @DecimalMax(value = "100.0", inclusive = true, message = "Tỉ lệ thành công không vượt quá 100%")
    private Float successRate;

    @Positive(message = "Giá phải là số dương")
    @NotNull(message = "Giá không được để trống")
    private BigDecimal price;

    @Size(max = 255, message = "Thông số kỹ thuật không được vượt quá 255 ký tự")
    private String specialfications;
}
