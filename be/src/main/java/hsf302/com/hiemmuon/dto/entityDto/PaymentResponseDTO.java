package hsf302.com.hiemmuon.dto.entityDto;

import hsf302.com.hiemmuon.entity.Payment;
import java.math.BigDecimal;
import java.time.LocalDateTime;

public class PaymentResponseDTO {
    private int paymentId;
    private int doctorId;
    private int customerId;
    private int appointmentId;
    private int serviceId;
    private BigDecimal total;
    private LocalDateTime paid;
    private String status;
    private String type;

    private String doctorName;
    private String customerName;
    private String serviceName;
    private LocalDateTime appointmentDate;

    public PaymentResponseDTO() {}

    public PaymentResponseDTO(int paymentId, int doctorId, int customerId, int appointmentId,
                              int serviceId, BigDecimal total, LocalDateTime paid, String status,
                              String type, String doctorName, String customerName,
                              String serviceName, LocalDateTime appointmentDate) {
        this.paymentId = paymentId;
        this.doctorId = doctorId;
        this.customerId = customerId;
        this.appointmentId = appointmentId;
        this.serviceId = serviceId;
        this.total = total;
        this.paid = paid;
        this.status = status;
        this.type = type;
        this.doctorName = doctorName;
        this.customerName = customerName;
        this.serviceName = serviceName;
        this.appointmentDate = appointmentDate;
    }

    public static PaymentResponseDTO fromPayment(Payment payment) {
        PaymentResponseDTO dto = new PaymentResponseDTO();
        dto.setPaymentId(payment.getPaymentId());
        dto.setDoctorId(payment.getAppointment().getDoctor().getDoctorId());
        dto.setCustomerId(payment.getCustomer().getCustomerId());
        dto.setAppointmentId(payment.getAppointment().getAppointmentId());
        dto.setServiceId(payment.getService().getServiceId());
        dto.setTotal(payment.getTotal());
        dto.setPaid(payment.getPaid());
        dto.setStatus(payment.getStatus().name());
        dto.setType(payment.getType().name());

        dto.setDoctorName(payment.getAppointment().getDoctor().getUser().getName());
        dto.setCustomerName(payment.getCustomer().getUser().getName());
        dto.setServiceName(payment.getService().getName());
        dto.setAppointmentDate(payment.getAppointment().getDate());

        return dto;
    }

    public int getPaymentId() {
        return paymentId;
    }

    public void setPaymentId(int paymentId) {
        this.paymentId = paymentId;
    }

    public int getDoctorId() {
        return doctorId;
    }

    public void setDoctorId(int doctorId) {
        this.doctorId = doctorId;
    }

    public int getCustomerId() {
        return customerId;
    }

    public void setCustomerId(int customerId) {
        this.customerId = customerId;
    }

    public int getAppointmentId() {
        return appointmentId;
    }

    public void setAppointmentId(int appointmentId) {
        this.appointmentId = appointmentId;
    }

    public int getServiceId() {
        return serviceId;
    }

    public void setServiceId(int serviceId) {
        this.serviceId = serviceId;
    }

    public BigDecimal getTotal() {
        return total;
    }

    public void setTotal(BigDecimal total) {
        this.total = total;
    }

    public LocalDateTime getPaid() {
        return paid;
    }

    public void setPaid(LocalDateTime paid) {
        this.paid = paid;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getDoctorName() {
        return doctorName;
    }

    public void setDoctorName(String doctorName) {
        this.doctorName = doctorName;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getServiceName() {
        return serviceName;
    }

    public void setServiceName(String serviceName) {
        this.serviceName = serviceName;
    }

    public LocalDateTime getAppointmentDate() {
        return appointmentDate;
    }

    public void setAppointmentDate(LocalDateTime appointmentDate) {
        this.appointmentDate = appointmentDate;
    }
}