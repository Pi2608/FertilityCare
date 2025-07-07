package hsf302.com.hiemmuon.dto.responseDto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateAppointmentServiceDTO {
    @Schema(description = "Ghi chú thêm của bác sĩ")
    private String note;

    @Schema(description = "ID dịch vụ muốn cập nhật")
    private int serviceId;

    private Integer testResultId;
}