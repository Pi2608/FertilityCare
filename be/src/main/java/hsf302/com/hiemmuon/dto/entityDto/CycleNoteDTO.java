package hsf302.com.hiemmuon.dto.entityDto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CycleNoteDTO {

    @NotBlank(message = "Ghi chú không được để trống")
    private String note;
}
