package hsf302.com.hiemmuon.dto.medicine;

import lombok.*;

import java.sql.Time;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MedicineDTO {
    private String name;
    private String discription;
    private String dose;
    private String frequency;
    private List<Time> time;
}