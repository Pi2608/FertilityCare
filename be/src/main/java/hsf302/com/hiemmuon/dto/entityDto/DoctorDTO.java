package hsf302.com.hiemmuon.dto.entityDto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import hsf302.com.hiemmuon.enums.Genders;
import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@JsonIgnoreProperties(ignoreUnknown = false)
@Getter
@Setter
public class DoctorDTO{

    private int userId;
    private String name;
    private Genders gender;
    private LocalDate dob;
    private String email;
    private String phone;
    private String specification;
    private int experience;
    private Float ratingAvg;
    private Boolean isActive;
}
