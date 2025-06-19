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
public class CycleOfCustomerDTO {

    @Positive(message = "ID chu kỳ phải là số dương")
    private int cycleId;

    @NotBlank(message = "Tên bác sĩ không được để trống")
    @Size(max = 100, message = "Tên bác sĩ không được vượt quá 100 ký tự")
    private String doctor;

    @NotBlank(message = "Tên dịch vụ không được để trống")
    @Size(max = 100, message = "Tên dịch vụ không được vượt quá 100 ký tự")
    private String service;

    @NotNull(message = "Ngày bắt đầu không được để trống")
    @PastOrPresent(message = "Ngày bắt đầu không được nằm trong tương lai")
    private LocalDate startDate;

    @NotNull(message = "Ngày kết thúc không được để trống")
    @FutureOrPresent(message = "Ngày kết thúc không được nằm trong quá khứ")
    private LocalDate endDate;

    @NotNull(message = "Trạng thái chu kỳ không được để trống")
    private StatusCycle status;

    @Size(max = 500, message = "Ghi chú không được vượt quá 500 ký tự")
    private String note;
}
