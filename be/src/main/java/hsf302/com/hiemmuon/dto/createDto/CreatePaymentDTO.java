package hsf302.com.hiemmuon.dto.createDto;

import hsf302.com.hiemmuon.entity.Payment.Status;
import hsf302.com.hiemmuon.entity.Payment.Type;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class CreatePaymentDTO {
    private int customerId;
    private int appointmentId;
    private int serviceId;
    private BigDecimal total;
    private LocalDateTime paid;
    private Status status = Status.pending;         // default
    private Type type = Type.treatment;             // default

    // Getters & Setters
    public int getCustomerId() { return customerId; }
    public void setCustomerId(int customerId) { this.customerId = customerId; }

    public int getAppointmentId() { return appointmentId; }
    public void setAppointmentId(int appointmentId) { this.appointmentId = appointmentId; }

    public int getServiceId() { return serviceId; }
    public void setServiceId(int serviceId) { this.serviceId = serviceId; }

    public BigDecimal getTotal() { return total; }
    public void setTotal(BigDecimal total) { this.total = total; }

    public LocalDateTime getPaid() { return paid; }
    public void setPaid(LocalDateTime paid) { this.paid = paid; }

    public Status getStatus() { return status; }
    public void setStatus(Status status) { this.status = status; }

    public Type getType() { return type; }
    public void setType(Type type) { this.type = type; }
}
