package hsf302.com.hiemmuon.controller;

import hsf302.com.hiemmuon.dto.testresult.CreateTestResultDTO;
import hsf302.com.hiemmuon.dto.testresult.TestResultViewDTO;
import hsf302.com.hiemmuon.dto.testresult.UpdateTestResultDTO;
import hsf302.com.hiemmuon.entity.TestResult;
import hsf302.com.hiemmuon.service.TestResultService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "6. Test Result Controller")
@RestController
@RequestMapping("/api/test-results")
public class TestResultController {

    @Autowired
    private TestResultService testResultService;

    @Operation(
            summary = "Tạo mới kết quả xét nghiệm",
            description = "API dùng để lưu kết quả xét nghiệm của bệnh nhân trong một bước điều trị cụ thể. Dành cho bác sĩ."
    )
    @PostMapping("/create")
    public ResponseEntity<String> create(@RequestBody CreateTestResultDTO dto) {
        testResultService.createTestResult(dto);
        return ResponseEntity.ok("Đã lưu kết quả xét nghiệm.");
    }


    @Operation(
            summary = "Bệnh nhân xem kết quả xét nghiệm của mình",
            description = "Trả về toàn bộ kết quả xét nghiệm liên quan đến bệnh nhân đang đăng nhập."
    )
    @GetMapping("/test-result/customer")
    public ResponseEntity<List<TestResultViewDTO>> getMyTestResult() {
        return ResponseEntity.ok(testResultService.getResultsForCustomer());
    }

    @Operation(
            summary = "Cập nhật kết quả xét nghiệm",
            description = "API cho phép cập nhật nội dung và thông tin kết quả xét nghiệm. Dành cho bác sĩ."
    )
    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateResult(
            @PathVariable Integer id,
            @RequestBody UpdateTestResultDTO dto
    ) {
        testResultService.updateTestResult(id, dto);
        return ResponseEntity.ok("Cập nhật kết quả xét nghiệm thành công.");
    }
}