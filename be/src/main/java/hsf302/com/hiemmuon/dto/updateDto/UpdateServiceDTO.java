package hsf302.com.hiemmuon.dto.updateDto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@JsonIgnoreProperties(ignoreUnknown = false)
@Getter
@Setter
public class UpdateServiceDTO {

    @NotBlank(message = "Mô tả không được để trống")
    private String description;

    @NotNull(message = "Tỷ lệ thành công không được để trống")
    @DecimalMin(value = "0.0", inclusive = true, message = "Tỷ lệ thành công phải từ 0% trở lên")
    @DecimalMax(value = "100.0", inclusive = true, message = "Tỷ lệ thành công không được vượt quá 100%")
    private Float successRate;

    @NotNull(message = "Giá tiền không được để trống")
    @DecimalMin(value = "0.0", inclusive = false, message = "Giá tiền phải lớn hơn 0")
    private BigDecimal price;

    @NotBlank(message = "Đặc tả không được để trống")
    private String specialfications;
}
