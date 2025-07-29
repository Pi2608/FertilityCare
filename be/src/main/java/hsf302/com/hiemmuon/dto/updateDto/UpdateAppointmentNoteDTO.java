package hsf302.com.hiemmuon.dto.updateDto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UpdateAppointmentNoteDTO {
    private String note;

    // Getter & Setter
    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }
}
