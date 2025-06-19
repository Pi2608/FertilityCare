package hsf302.com.hiemmuon.dto.dto.updateDto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import hsf302.com.hiemmuon.enums.Genders;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@JsonIgnoreProperties(ignoreUnknown = false)
@Getter
@Setter
public class UpdateDoctorDTO {
    @NotBlank(message = "Tên không được để trống")
    @Size(min = 2, max = 50, message = "Tên phải từ 2 đến 50 ký tự")
    private String name;

    @NotBlank(message = "Tên không được để trống")
    @Size(min = 2, max = 50, message = "Tên phải từ 2 đến 50 ký tự")
    private String phone;

    @Past(message = "Ngày sinh phải nằm trong quá khứ")
    private LocalDate dob;

    private Genders gender;

    @Pattern(regexp = "^(IUI|IVF)$", message = "Description chỉ được phép là IUI hoặc IVF")
    private String description;

    public UpdateDoctorDTO() {
    }

    public UpdateDoctorDTO(String name, String phone, LocalDate dob, Genders gender, String description) {
        this.name = name;
        this.phone = phone;
        this.dob = dob;
        this.gender = gender;
        this.description = description;
    }
}
