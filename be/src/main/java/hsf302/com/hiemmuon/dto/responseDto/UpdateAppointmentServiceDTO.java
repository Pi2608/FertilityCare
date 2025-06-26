package hsf302.com.hiemmuon.dto.appointment;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateAppointmentServiceDTO {
        @Schema(description = "Ghi chú thêm của bác sĩ")
        private String note;

        @Schema(description = "ID dịch vụ muốn cập nhật")
        private int serviceId;

        private String status;

        private Integer testResultId;
    }

