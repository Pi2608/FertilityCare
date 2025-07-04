package hsf302.com.hiemmuon.dto.responseDto;

import java.time.LocalDate;

public class NoteDTO {
    private LocalDate date;
    private String content;
    private String doctorName;

    public NoteDTO() {
    }

    public NoteDTO(LocalDate date, String content, String doctorName) {
        this.date = date;
        this.content = content;
        this.doctorName = doctorName;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getDoctorName() {
        return doctorName;
    }

    public void setDoctorName(String doctorName) {
        this.doctorName = doctorName;
    }
}
