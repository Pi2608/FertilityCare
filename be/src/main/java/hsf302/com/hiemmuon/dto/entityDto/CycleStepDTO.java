package hsf302.com.hiemmuon.dto.entityDto;

import hsf302.com.hiemmuon.enums.StatusCycle;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CycleStepDTO {

    @NotBlank(message = "Tên dịch vụ không được để trống")
    @Size(max = 100, message = "Tên dịch vụ không được vượt quá 100 ký tự")
    private String serive;

    @NotBlank(message = "Mô tả không được để trống")
    @Size(max = 500, message = "Mô tả không được vượt quá 500 ký tự")
    private String description;

    @NotNull(message = "Ngày sự kiện không được để trống")
    @PastOrPresent(message = "Ngày sự kiện không thể ở tương lai")
    private LocalDate eventdate;

    @NotNull(message = "Trạng thái bước điều trị không được để trống")
    private StatusCycle statusCycleStep;
}
