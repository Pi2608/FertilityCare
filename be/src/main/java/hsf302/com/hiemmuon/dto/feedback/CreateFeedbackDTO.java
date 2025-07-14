package hsf302.com.hiemmuon.dto.feedback;

public class CreateFeedbackDTO {
    private String comment;
    private int rating;
    private int doctorId;

    public CreateFeedbackDTO() {
    }

    public CreateFeedbackDTO(String comment, int rating, int doctorId) {
        this.comment = comment;
        this.rating = rating;
        this.doctorId = doctorId;
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

    public int getDoctorId() {
        return doctorId;
    }

    public void setDoctorId(int doctorId) {
        this.doctorId = doctorId;
    }
}

