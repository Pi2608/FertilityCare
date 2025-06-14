package hsf302.com.hiemmuon.dto.entityDto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import hsf302.com.hiemmuon.enums.Genders;
import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

@JsonIgnoreProperties(ignoreUnknown = false)
@Getter
@Setter
public class DoctorDTOForCustomer {

    @NotBlank(message = "Tên không được để trống")
    @Size(max = 100, message = "Tên không được vượt quá 100 ký tự")
    private String name;

    @NotNull(message = "Giới tính không được để trống")
    private Genders gender;

    @NotBlank(message = "Email không được để trống")
    @Email(message = "Email không hợp lệ")
    private String email;

    @NotBlank(message = "Số điện thoại không được để trống")
    @Pattern(
            regexp = "^(0[0-9]{9})$",
            message = "Số điện thoại phải gồm 10 chữ số và bắt đầu bằng số 0"
    )
    private String phone;

    @NotBlank(message = "Chuyên môn không được để trống")
    @Size(max = 255, message = "Chuyên môn không được vượt quá 255 ký tự")
    private String specification;

    @DecimalMin(value = "0.0", inclusive = true, message = "Đánh giá trung bình phải từ 0")
    @DecimalMax(value = "5.0", inclusive = true, message = "Đánh giá trung bình tối đa là 5")
    private Float ratingAvg;

    @Min(value = 0, message = "Kinh nghiệm không được nhỏ hơn 0 năm")
    @Max(value = 60, message = "Kinh nghiệm không được vượt quá 60 năm")
    private int experience;
}
