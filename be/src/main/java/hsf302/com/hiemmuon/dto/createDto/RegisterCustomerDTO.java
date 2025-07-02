package hsf302.com.hiemmuon.dto.createDto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import hsf302.com.hiemmuon.enums.Genders;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@JsonIgnoreProperties(ignoreUnknown = false)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RegisterCustomerDTO {

    @NotBlank(message = "Tên không được để trống")
    @Size(max = 100, message = "Tên không được vượt quá 100 ký tự")
    private String name;

    @NotBlank(message = "Email không được để trống")
    @Email(message = "Email không hợp lệ")
    private String email;

    @NotBlank(message = "Mật khẩu không được để trống")
    @Size(min = 6, max = 50, message = "Mật khẩu phải từ 6 đến 50 ký tự")
    private String password;

    @Size(max = 500, message = "Tiền sử bệnh không được vượt quá 500 ký tự")
    private String medicalHistory;

    @NotBlank(message = "Số điện thoại không được để trống")
    @Pattern(regexp = "^(\\+84|0)(\\d{9,10})$", message = "Số điện thoại không hợp lệ")
    private String phone;

    @NotNull(message = "Giới tính không được để trống")
    private Genders gender;

    @NotNull(message = "Ngày sinh không được để trống")
    @Past(message = "Ngày sinh phải là một ngày trong quá khứ")
    private LocalDate dob;

    private String otp;
}
