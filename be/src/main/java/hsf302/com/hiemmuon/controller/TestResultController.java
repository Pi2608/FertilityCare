package hsf302.com.hiemmuon.controller;

import hsf302.com.hiemmuon.dto.ApiResponse;
import hsf302.com.hiemmuon.dto.testresult.CreateTestResultDTO;
import hsf302.com.hiemmuon.dto.testresult.TestResultViewDTO;
import hsf302.com.hiemmuon.dto.testresult.UpdateTestResultDTO;
import hsf302.com.hiemmuon.service.TestResultService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
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
    @PostMapping
    public ResponseEntity<ApiResponse<Void>> create(@Valid @RequestBody CreateTestResultDTO dto) {
        testResultService.createTestResult(dto);

        return ResponseEntity.ok(
                new ApiResponse<>(200, "Đã lưu kết quả xét nghiệm thành công", null)
        );
    }

    @Operation(
            summary = "Bệnh nhân xem kết quả xét nghiệm của mình",
            description = "Trả về toàn bộ kết quả xét nghiệm liên quan đến bệnh nhân đang đăng nhập."
    )
    @GetMapping("/me")
    public ResponseEntity<ApiResponse<List<TestResultViewDTO>>> getMyTestResult() {
        List<TestResultViewDTO> results = testResultService.getResultsForCustomer();

        return ResponseEntity.ok(
                new ApiResponse<>(200, "Lấy kết quả xét nghiệm thành công", results)
        );
    }

    @Operation(
            summary = "Cập nhật kết quả xét nghiệm",
            description = "API cho phép cập nhật nội dung và thông tin kết quả xét nghiệm. Dành cho bác sĩ."
    )
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> updateResult(
            @PathVariable Integer id,
            @Valid @RequestBody UpdateTestResultDTO dto
    ) {
        testResultService.updateTestResult(id, dto);

        return ResponseEntity.ok(
                new ApiResponse<>(200, "Cập nhật kết quả xét nghiệm thành công", null)
        );
    }
}
