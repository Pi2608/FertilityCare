package hsf302.com.hiemmuon.dto.doctor;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import hsf302.com.hiemmuon.enums.Genders;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
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
public class UpdateDoctorDTO {
    @NotBlank(message = "Tên không được để trống")
    @Size(min = 2, max = 50, message = "Tên phải từ 2 đến 50 ký tự")
    private String name;

    @NotBlank(message = "Số điện thoại không được để trống")
    @Size(min = 2, max = 50, message = "Số điện thoại phải từ 2 đến 50 ký tự")
    private String phone;

    @Past(message = "Ngày sinh phải nằm trong quá khứ")
    private LocalDate dob;

    private Genders gender;

    @Pattern(regexp = "^(IUI|IVF)$", message = "Specification chỉ được phép là IUI hoặc IVF")
    private String specification;

    // 💬 Mô tả về bác sĩ
    @Size(max = 5000, message = "Thông tin về bác sĩ quá dài")
    private String about;

    // 🧠 Phương pháp tiếp cận điều trị
    @Size(max = 5000, message = "Thông tin phương pháp tiếp cận quá dài")
    private String approach;

    // 🎓 Học vấn
    @Size(max = 3000, message = "Thông tin học vấn quá dài")
    private String education;

    // 🏅 Chứng chỉ & Giải thưởng
    @Size(max = 3000, message = "Thông tin chứng chỉ quá dài")
    private String certificates;

    // 💼 Kinh nghiệm chuyên môn
    @Size(max = 5000, message = "Thông tin kinh nghiệm quá dài")
    private String workExperience;
}