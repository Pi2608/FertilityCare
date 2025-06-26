package hsf302.com.hiemmuon.dto.responseDto;

import lombok.*;

import java.sql.Time;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MedicineDTO {
    private String name;
    private String discription;
    private String dose;
    private String frequency;
    private Time time;
}