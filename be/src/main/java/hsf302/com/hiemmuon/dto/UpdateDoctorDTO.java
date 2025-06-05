package hsf302.com.hiemmuon.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import hsf302.com.hiemmuon.enums.Genders;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@JsonIgnoreProperties(ignoreUnknown = false)
@Getter
@Setter
public class UpdateDoctorDTO {
    private String password;
    private String name;
    private String phone;
    private LocalDate dob;
    private Genders gender;
    private String description;

    public UpdateDoctorDTO() {
    }

    public UpdateDoctorDTO(String password, String name, String phone, LocalDate dob, Genders gender, String description) {
        this.password = password;
        this.name = name;
        this.phone = phone;
        this.dob = dob;
        this.gender = gender;
        this.description = description;
    }
}
