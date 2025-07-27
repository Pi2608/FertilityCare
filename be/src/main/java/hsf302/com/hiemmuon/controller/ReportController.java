package hsf302.com.hiemmuon.controller;

import hsf302.com.hiemmuon.dto.ApiResponse;
import hsf302.com.hiemmuon.service.ReportService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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
            summary = "Lấy thống kê tài khoản",
            description = "API cung cấp thống kê các tài khoản (ví dụ: số lượng tài khoản, trạng thái).",
            security = @SecurityRequirement(name = "bearerAuth")
    )
    @io.swagger.v3.oas.annotations.responses.ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Thống kê tài khoản thành công"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "204", description = "Không có dữ liệu thống kê"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "403", description = "Không có quyền truy cập"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "500", description = "Lỗi server")
    })
    @GetMapping("/accounts")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getAccountStats() {
        try {
            Map<String, Object> stats = reportService.getAccountStats();
            if (stats == null || stats.isEmpty()) {
                return ResponseEntity.noContent().build();
            }
            return ResponseEntity.ok(new ApiResponse<>(200, "Get account stats successfully", stats));
        } catch (Exception e) {
            return ResponseEntity.status(500)
                    .body(new ApiResponse<>(500, "Error retrieving account stats: " + e.getMessage(), null));
        }
    }

    @Operation(
            summary = "Lấy doanh thu theo tháng",
            description = "API cung cấp doanh thu theo từng tháng.",
            security = @SecurityRequirement(name = "bearerAuth")
    )
    @io.swagger.v3.oas.annotations.responses.ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Lấy doanh thu thành công"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "204", description = "Không có dữ liệu doanh thu"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "403", description = "Không có quyền truy cập"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "500", description = "Lỗi server")
    })
    @GetMapping("/revenue")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getMonthlyRevenue() {
        try {
            Map<String, Object> revenue = reportService.getMonthlyRevenue();
            if (revenue == null || revenue.isEmpty()) {
                return ResponseEntity.noContent().build();
            }
            return ResponseEntity.ok(new ApiResponse<>(200, "Get monthly revenue successfully", revenue));
        } catch (Exception e) {
            return ResponseEntity.status(500)
                    .body(new ApiResponse<>(500, "Error retrieving monthly revenue: " + e.getMessage(), null));
        }
    }

    @Operation(
            summary = "Lấy tóm tắt thông tin người dùng",
            description = "API cung cấp tóm tắt thông tin người dùng (ví dụ: số lượng người dùng, phân loại).",
            security = @SecurityRequirement(name = "bearerAuth")
    )
    @io.swagger.v3.oas.annotations.responses.ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Lấy tóm tắt người dùng thành công"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "204", description = "Không có dữ liệu tóm tắt"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "403", description = "Không có quyền truy cập"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "500", description = "Lỗi server")
    })
    @GetMapping("/users/summary")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getUserSummary() {
        try {
            Map<String, Object> summary = reportService.getUserStats();
            if (summary == null || summary.isEmpty()) {
                return ResponseEntity.noContent().build();
            }
            return ResponseEntity.ok(new ApiResponse<>(200, "Get user summary successfully", summary));
        } catch (Exception e) {
            return ResponseEntity.status(500)
                    .body(new ApiResponse<>(500, "Error retrieving user summary: " + e.getMessage(), null));
        }
    }
}