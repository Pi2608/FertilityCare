package hsf302.com.hiemmuon.controller;

import hsf302.com.hiemmuon.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/reports")
public class ReportController {

    @Autowired
    private ReportService reportService;


    @GetMapping("/accounts")
    public ResponseEntity<Map<String, Object>> getAccountStats() {
        return ResponseEntity.ok(reportService.getAccountStats());
    }

    @GetMapping("/revenue")
    public ResponseEntity<Map<String, Object>> getMonthlyRevenue() {
        return ResponseEntity.ok(reportService.getMonthlyRevenue());
    }

    @GetMapping("/users/summary")
    public ResponseEntity<Map<String, Object>> getUserSummary() {
        return ResponseEntity.ok(reportService.getUserStats());
    }

}
