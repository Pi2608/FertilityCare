package hsf302.com.hiemmuon.dto.responseDto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import hsf302.com.hiemmuon.enums.Genders;
import lombok.*;

import java.time.LocalDate;

@JsonIgnoreProperties(ignoreUnknown = false)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DoctorDTO {

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
    private String about;
    private String approach;
    private String education;
    private String certificates;
    private String workExperience;
}
