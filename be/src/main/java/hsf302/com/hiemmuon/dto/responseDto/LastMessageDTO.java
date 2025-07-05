package hsf302.com.hiemmuon.dto.responseDto;

import java.time.LocalDateTime;

public class LastMessageDTO {
    private int userId;          // Người còn lại trong đoạn chat
    private String userName;     // Tên người kia (để FE hiển thị)
    private String content;      // Nội dung tin nhắn cuối cùng
    private LocalDateTime timestamp;

    public LastMessageDTO() {
    }

    public LastMessageDTO(int userId, String userName, String content, LocalDateTime timestamp) {
        this.userId = userId;
        this.userName = userName;
        this.content = content;
        this.timestamp = timestamp;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
}
