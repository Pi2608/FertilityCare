package hsf302.com.hiemmuon.controller;

import hsf302.com.hiemmuon.dto.ApiResponse;
import hsf302.com.hiemmuon.service.ReportService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@Tag(name = "13. Report Controller")
@RestController
@RequestMapping("/api/reports")
public class ReportController {

    @Autowired
    private ReportService reportService;


    @Operation(
            summary = "Thống kê tài khoản hệ thống",
            description = "Trả về số lượng tài khoản theo từng vai trò như Admin, Manager, Doctor, Customer, v.v."
    )
    @GetMapping("/accounts")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getAccountStats() {
        Map<String, Object> stats = reportService.getAccountStatus();

        ApiResponse<Map<String, Object>> response = new ApiResponse<>(
                200,
                "Thống kê tài khoản thành công",
                stats
        );

        return ResponseEntity.ok(response);
    }


    @Operation(
            summary = "Thống kê doanh thu theo tháng",
            description = "Trả về tổng doanh thu của từng tháng trong năm hiện tại, bao gồm tên/tháng và tổng tiền."
    )
    @GetMapping("/revenue")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getMonthlyRevenue() {
        Map<String, Object> revenue = reportService.getMonthlyRevenue();

        ApiResponse<Map<String, Object>> response = new ApiResponse<>(
                200,
                "Lấy thống kê doanh thu theo tháng thành công",
                revenue
        );

        return ResponseEntity.ok(response);
    }


    @Operation(
            summary = "Thống kê tổng quan người dùng",
            description = "Trả về tổng số tài khoản theo vai trò và tổng số tài khoản đang hoạt động trong hệ thống."
    )
    @GetMapping("/users/summary")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getUserSummary() {
        Map<String, Object> stats = reportService.getUserStats();

        ApiResponse<Map<String, Object>> response = new ApiResponse<>(
                200,
                "Lấy thống kê người dùng thành công",
                stats
        );

        return ResponseEntity.ok(response);
    }


}
