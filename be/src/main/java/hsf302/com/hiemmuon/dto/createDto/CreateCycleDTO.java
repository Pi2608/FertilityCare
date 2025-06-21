package hsf302.com.hiemmuon.dto.createDto;

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
public class CreateCycleDTO {

    @Positive(message = "customerId phải lớn hơn 0")
    private int customerId;

    @Positive(message = "serviceId phải lớn hơn 0")
    private int serviceId;

    @NotNull(message = "startDate không được để trống")
    @FutureOrPresent(message = "startDate phải là ngày hiện tại hoặc tương lai")
    private LocalDate startDate;

    @NotNull(message = "endDate không được để trống")
    private LocalDate endDate;

    private String note;
}