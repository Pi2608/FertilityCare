package hsf302.com.hiemmuon.dto.createDto;

import hsf302.com.hiemmuon.enums.StatusPayment;
import hsf302.com.hiemmuon.enums.TypePayment;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreatePaymentWithReExamDTO {

    private int customerId;
    private int serviceId;
    private BigDecimal total;
    private LocalDateTime paidDate;
    private StatusPayment status;
    private TypePayment type;

    // Thông tin cho appointment tái khám
    private LocalDateTime appointmentDate;
    private String note;
}