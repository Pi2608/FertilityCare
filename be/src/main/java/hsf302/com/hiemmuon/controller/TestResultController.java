package hsf302.com.hiemmuon.controller;

import hsf302.com.hiemmuon.dto.testresult.CreateTestResultDTO;
import hsf302.com.hiemmuon.dto.testresult.TestResultViewDTO;
import hsf302.com.hiemmuon.dto.testresult.UpdateTestResultDTO;
import hsf302.com.hiemmuon.entity.TestResult;
import hsf302.com.hiemmuon.service.TestResultService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/test-results")
public class TestResultController {

    @Autowired
    private TestResultService testResultService;

    @PostMapping("/create")
    public ResponseEntity<String> create(@RequestBody CreateTestResultDTO dto){
        testResultService.createTestResult(dto);
        return ResponseEntity.ok("Đã lưu kết quả xét nghiệm.");
    }


    @GetMapping("/test-result/customer")
    public ResponseEntity<List<TestResultViewDTO>> getMyTestResult(){
        return ResponseEntity.ok(testResultService.getResultsForCustomer());
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateResult(
            @PathVariable Integer id,
            @RequestBody UpdateTestResultDTO dto
    ){
        testResultService.updateTestResult(id, dto);
        return ResponseEntity.ok("Cập nhật kết quả xét nghiệm thành công.");
    }
}
