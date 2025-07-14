package hsf302.com.hiemmuon.dto.payment;

import hsf302.com.hiemmuon.entity.Payment;
import java.math.BigDecimal;
import java.time.LocalDateTime;

import hsf302.com.hiemmuon.enums.StatusPayment;
import hsf302.com.hiemmuon.enums.TypePayment;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaymentResponsesDTO {
    private int paymentId;
    private int doctorId;
    private int customerId;
    private int appointmentId;
    private int serviceId;
    private BigDecimal total;
    private LocalDateTime paid;
    private StatusPayment status;
    private TypePayment type;

    private String doctorName;
    private String customerName;
    private String serviceName;
    private LocalDateTime appointmentDate;

    public static PaymentResponsesDTO fromPayment(Payment payment) {
        if (payment == null) return null;

        return PaymentResponsesDTO.builder()
                .paymentId(payment.getPaymentId())
                .doctorId(payment.getAppointment().getDoctor().getDoctorId())
                .customerId(payment.getCustomer().getCustomerId())
                .appointmentId(payment.getAppointment().getAppointmentId())
                .serviceId(payment.getService().getServiceId())
                .total(payment.getTotal())
                .paid(payment.getPaid())
                .status(payment.getStatus())
                .type(payment.getType())
                .doctorName(payment.getAppointment().getDoctor().getUser().getName())
                .customerName(payment.getCustomer().getUser().getName())
                .serviceName(payment.getService().getName())
                .appointmentDate(payment.getAppointment().getDate())
                .build();
    }
}