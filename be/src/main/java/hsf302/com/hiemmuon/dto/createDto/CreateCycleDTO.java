package hsf302.com.hiemmuon.dto.createDto;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
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

    @Positive(message = "customerId không hợp lệ!")
    private int customerId;

    @Positive(message = "serviceId không hợp lệ!")
    private int serviceId;

    @NotNull(message = "startDate không được để trống")
    @FutureOrPresent(message = "startDate phải là ngày hiện tại hoặc tương lai")
    private LocalDate startDate;

    private String note;
}