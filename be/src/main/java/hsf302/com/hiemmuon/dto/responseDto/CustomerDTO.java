package hsf302.com.hiemmuon.dto.responseDto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import hsf302.com.hiemmuon.enums.Genders;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@JsonIgnoreProperties(ignoreUnknown = false)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CustomerDTO {
    private int id;
    private boolean isActive;
    private String medicalHistory;
    private String name;
    private LocalDate dob;
    private Genders gender;
    private String phone;
    private String email;
}
