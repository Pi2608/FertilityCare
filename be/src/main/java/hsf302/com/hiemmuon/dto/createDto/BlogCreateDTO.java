package hsf302.com.hiemmuon.dto.createDto;

public class BlogCreateDTO {
    private String title;
    private String content;
    private String tags;
    private int userId;

    public BlogCreateDTO() {
    }

    public BlogCreateDTO(String title, String content, String tags, int userId) {
        this.title = title;
        this.content = content;
        this.tags = tags;
        this.userId = userId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getTags() {
        return tags;
    }

    public void setTags(String tags) {
        this.tags = tags;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }
}
