package hsf302.com.hiemmuon.dto.entityDto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.validation.constraints.*;

@JsonIgnoreProperties(ignoreUnknown = false)
@lombok.Getter
@lombok.Setter
public class TreatmentStepDTO {

    @Min(value = 1, message = "Thứ tự bước phải bắt đầu từ 1")
    private int stepOrder;

    @NotBlank(message = "Tiêu đề không được để trống")
    @Size(max = 100, message = "Tiêu đề không được vượt quá 100 ký tự")
    private String title;

    @NotBlank(message = "Mô tả không được để trống")
    @Size(max = 500, message = "Mô tả không được vượt quá 500 ký tự")
    private String description;
}
