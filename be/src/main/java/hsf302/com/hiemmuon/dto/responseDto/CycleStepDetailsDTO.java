package hsf302.com.hiemmuon.dto.responseDto;

import hsf302.com.hiemmuon.dto.testresult.TestResultViewDTO;

import java.util.List;

public class CycleStepDetailsDTO {
    private List<TestResultViewDTO> testResults;
    private List<MedicineScheduleDTO> medicineSchedules;
    private String note; // chỉ là một dòng ghi chú từ bảng cycle_steps

    public CycleStepDetailsDTO() {
    }

    public CycleStepDetailsDTO(List<TestResultViewDTO> testResults, List<MedicineScheduleDTO> medicineSchedules, String note) {
        this.testResults = testResults;
        this.medicineSchedules = medicineSchedules;
        this.note = note;
    }

    public List<TestResultViewDTO> getTestResults() {
        return testResults;
    }

    public void setTestResults(List<TestResultViewDTO> testResults) {
        this.testResults = testResults;
    }

    public List<MedicineScheduleDTO> getMedicineSchedules() {
        return medicineSchedules;
    }

    public void setMedicineSchedules(List<MedicineScheduleDTO> medicineSchedules) {
        this.medicineSchedules = medicineSchedules;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }
}

