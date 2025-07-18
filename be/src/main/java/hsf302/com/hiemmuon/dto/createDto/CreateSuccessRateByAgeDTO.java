package hsf302.com.hiemmuon.dto.createDto;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class CreateSuccessRateByAgeDTO {
    @NotBlank(message = "Nhóm tuổi không được để trống")
    private String ageGroup;

    @NotNull(message = "Tỷ lệ mang thai lâm sàng không được để trống")
    @DecimalMin(value = "0.0", message = "Tỷ lệ mang thai phải lớn hơn hoặc bằng 0")
    @DecimalMax(value = "100.0", message = "Tỷ lệ mang thai không được vượt quá 100")
    private Float clinicalPregnancyRate;

    @NotBlank(message = "So sánh với trung bình quốc gia không được để trống")
    private String comparedToNationalAverage;

    @Min(value = 1, message = "ID dịch vụ phải lớn hơn 0")
    private int treatmentServiceId;
}
