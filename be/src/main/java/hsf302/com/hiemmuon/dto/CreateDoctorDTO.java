package hsf302.com.hiemmuon.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

@JsonIgnoreProperties(ignoreUnknown = false)
@Getter
@Setter
public class CreateDoctorDTO {
    String email;
    String password;
}
