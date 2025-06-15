package hsf302.com.hiemmuon.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateCustomerDTO {
    private String name;
    private String email;
    private String phones;
    private String gender;
    private String dob;
    private String medicalHistory;
}
