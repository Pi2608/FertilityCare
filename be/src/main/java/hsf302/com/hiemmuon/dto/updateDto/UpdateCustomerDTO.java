package hsf302.com.hiemmuon.dto.updateDto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@JsonIgnoreProperties(ignoreUnknown = false)
@Getter
@Setter
public class UpdateCustomerDTO {

    @NotBlank(message = "Tên không được để trống")
    @Size(max = 100, message = "Tên không được vượt quá 100 ký tự")
    private String name;

    @NotBlank(message = "Số điện thoại không được để trống")
    @Pattern(regexp = "^(\\+84|0)(\\d{9,10})$", message = "Số điện thoại không hợp lệ")
    private String phones;

    @NotBlank(message = "Giới tính không được để trống")
    @Pattern(regexp = "^(Nam|Nữ|Khác)$", message = "Giới tính phải là 'Nam', 'Nữ' hoặc 'Khác'")
    private String gender;

    @NotBlank(message = "Ngày sinh không được để trống")
    @Pattern(regexp = "^\\d{4}-\\d{2}-\\d{2}$", message = "Ngày sinh phải đúng định dạng yyyy-MM-dd")
    private String dob;

    @Size(max = 500, message = "Tiền sử bệnh không được vượt quá 500 ký tự")
    private String medicalHistory;
}
