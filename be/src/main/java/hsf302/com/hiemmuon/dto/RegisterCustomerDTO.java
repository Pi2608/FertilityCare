package hsf302.com.hiemmuon.dto;

import hsf302.com.hiemmuon.enums.Genders;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class RegisterCustomerDTO {
    private String name;
    private String email;
    private String password;
    private String medicalHistory;
    private String phone;
    private Genders gender;
    private LocalDate dob;
}
