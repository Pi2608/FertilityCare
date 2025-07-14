package hsf302.com.hiemmuon.dto.feedback;

import java.time.LocalDateTime;

public class FeedbackViewDTO {
    private int feedbackId;
    private String comment;
    private int rating;
    private LocalDateTime createAt;

    private int doctorId;
    private String doctorName;

    private int customerId;
    private String customerName;

    public FeedbackViewDTO() {
    }

    public FeedbackViewDTO(int feedbackId, String comment, int rating, LocalDateTime createAt, int doctorId, String doctorName, int customerId, String customerName) {
        this.feedbackId = feedbackId;
        this.comment = comment;
        this.rating = rating;
        this.createAt = createAt;
        this.doctorId = doctorId;
        this.doctorName = doctorName;
        this.customerId = customerId;
        this.customerName = customerName;
    }

    public int getFeedbackId() {
        return feedbackId;
    }

    public void setFeedbackId(int feedbackId) {
        this.feedbackId = feedbackId;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public LocalDateTime getCreateAt() {
        return createAt;
    }

    public void setCreateAt(LocalDateTime createAt) {
        this.createAt = createAt;
    }

    public int getDoctorId() {
        return doctorId;
    }

    public void setDoctorId(int doctorId) {
        this.doctorId = doctorId;
    }

    public String getDoctorName() {
        return doctorName;
    }

    public void setDoctorName(String doctorName) {
        this.doctorName = doctorName;
    }

    public int getCustomerId() {
        return customerId;
    }

    public void setCustomerId(int customerId) {
        this.customerId = customerId;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }
}
