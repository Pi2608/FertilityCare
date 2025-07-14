package hsf302.com.hiemmuon.dto.feedback;

public class UpdateFeedbackDTO {
    private String comment;
    private int rating;

    public UpdateFeedbackDTO() {
    }

    public UpdateFeedbackDTO(String comment, int rating) {
        this.comment = comment;
        this.rating = rating;
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
}
