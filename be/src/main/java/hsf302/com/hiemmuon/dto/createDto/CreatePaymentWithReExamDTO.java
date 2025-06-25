package hsf302.com.hiemmuon.dto.createDto;

import hsf302.com.hiemmuon.entity.Payment;
import java.math.BigDecimal;
import java.time.LocalDateTime;

public class CreatePaymentWithReExamDTO {
    private int customerId;
    private int serviceId;
    private LocalDateTime appointmentDate;
    private String note;
    private BigDecimal total;
    private LocalDateTime paidDate; // Thay đổi từ paid amount thành paid date
    private Payment.Status status;
    private Payment.Type type;

    // Constructors
    public CreatePaymentWithReExamDTO() {}

    public CreatePaymentWithReExamDTO(int customerId, int serviceId,
                                      LocalDateTime appointmentDate, String note,
                                      BigDecimal total, LocalDateTime paidDate,
                                      Payment.Status status, Payment.Type type) {
        this.customerId = customerId;
        this.serviceId = serviceId;
        this.appointmentDate = appointmentDate;
        this.note = note;
        this.total = total;
        this.paidDate = paidDate;
        this.status = status;
        this.type = type;
    }

    // Getters and Setters
    public int getCustomerId() {
        return customerId;
    }

    public void setCustomerId(int customerId) {
        this.customerId = customerId;
    }

    public int getServiceId() {
        return serviceId;
    }

    public void setServiceId(int serviceId) {
        this.serviceId = serviceId;
    }

    public LocalDateTime getAppointmentDate() {
        return appointmentDate;
    }

    public void setAppointmentDate(LocalDateTime appointmentDate) {
        this.appointmentDate = appointmentDate;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public BigDecimal getTotal() {
        return total;
    }

    public void setTotal(BigDecimal total) {
        this.total = total;
    }

    public LocalDateTime getPaidDate() {
        return paidDate;
    }

    public void setPaidDate(LocalDateTime paidDate) {
        this.paidDate = paidDate;
    }

    public Payment.Status getStatus() {
        return status;
    }

    public void setStatus(Payment.Status status) {
        this.status = status;
    }

    public Payment.Type getType() {
        return type;
    }

    public void setType(Payment.Type type) {
        this.type = type;
    }
}