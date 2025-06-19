package hsf302.com.hiemmuon.dto.dto.entityDto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import hsf302.com.hiemmuon.enums.Genders;

import java.time.LocalDate;

@JsonIgnoreProperties(ignoreUnknown = false)
@lombok.Getter
@lombok.Setter
public class CustomerDTO {
    private int id;
    private boolean isActive;
    private String medicalHistory;
    private String name;
    private LocalDate dob;
    private Genders gender;
    private String phone;
    private String email;

    public CustomerDTO() {
    }

    public CustomerDTO(int id, boolean isActive, String medicalHistory, String name, LocalDate dob, Genders gender, String phone, String email) {
        this.id = id;
        this.isActive = isActive;
        this.medicalHistory = medicalHistory;
        this.name = name;
        this.dob = dob;
        this.gender = gender;
        this.phone = phone;
    }
}
