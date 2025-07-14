package hsf302.com.hiemmuon.dto.createDto;

public class SendMessageDTO {
    private int receiverId;
    private String message;

    public SendMessageDTO() {
    }

    public SendMessageDTO( int receiverId, String message) {
        this.receiverId = receiverId;
        this.message = message;
    }


    public int getReceiverId() {
        return receiverId;
    }

    public void setReceiverId(int receiverId) {
        this.receiverId = receiverId;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }


}
