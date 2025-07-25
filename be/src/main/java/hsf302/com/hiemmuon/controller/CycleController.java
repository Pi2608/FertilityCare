package hsf302.com.hiemmuon.controller;

import hsf302.com.hiemmuon.dto.ApiResponse;
import hsf302.com.hiemmuon.dto.createDto.CreateCycleDTO;
import hsf302.com.hiemmuon.dto.responseDto.CycleDTO;
import hsf302.com.hiemmuon.dto.responseDto.CycleNoteDTO;
import hsf302.com.hiemmuon.service.CycleService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "5. Cycle Controller")
@RestController
@RequestMapping("/api/cycles")
public class CycleController {

    @Autowired
    private CycleService cycleService;

    @Operation(
            summary = "Xem danh sách chu kỳ điều trị của khách hàng",
            description = "API giúp khách hàng truy xuất toàn bộ các chu kỳ điều trị đã được tạo trong quá trình điều trị sinh sản."
    )
    @GetMapping("/meC/cycle/all")
    public ResponseEntity<ApiResponse<?>> getMyAllCycle(HttpServletRequest request) {
        List<CycleDTO> cycles = cycleService.getAllCycleOfCustomer(request);

        ApiResponse<List<CycleDTO>> response = new ApiResponse<>(
                200,
                "Get all cycles of customer successfully",
                cycles);
        return ResponseEntity.ok(response);
    }

    @Operation(
            summary = "Xem danh sách chu kỳ điều trị của bác sĩ",
            description = "API cho phép bác sĩ xem tất cả các chu kỳ mà họ đang phụ trách điều trị cho bệnh nhân."
    )
    @GetMapping("/meD/cycle/all")
    public ResponseEntity<ApiResponse<?>> getCustomerCycleStep(
            HttpServletRequest request) {
        List<CycleDTO> steps = cycleService.getAllCycleOfDoctor(request);

        ApiResponse<List<CycleDTO>> response = new ApiResponse<>(
                200,
                "Get all cycle of doctor successfully",
                steps);

        return ResponseEntity.ok(response);
    }

    @Operation(
        summary = "Bác sĩ xem chu kỳ điều trị hiện tại của khách hàng",
        description = "API cho phép bác sĩ lấy chu kỳ điều trị đang diễn ra mới nhất của khách hàng, chỉ khi bác sĩ là người điều trị."
    )
    @GetMapping("/current-cycle/{customerId}")
    public ResponseEntity<ApiResponse<?>> getCurrentCycleByCustomerId(
            HttpServletRequest request,
            @PathVariable("customerId") int customerId) {
            CycleDTO cycle = cycleService.getCurrentCycleByCustomerId(request, customerId);

            ApiResponse<CycleDTO> response = new ApiResponse<>(
                    200,
                    "Get current cycle of customer successfully",
                    cycle
            );
            return ResponseEntity.ok(response);
    }

    @Operation(
            summary = "Cập nhật ghi chú chu kỳ điều trị",
            description = "Bác sĩ cập nhật hoặc thêm ghi chú chuyên môn vào một chu kỳ điều trị cụ thể."
    )
    @PatchMapping("/cycleId/{cycleId}/note")
    public ResponseEntity<ApiResponse<?>> updateCycleNote(
            @PathVariable("cycleId") int cycleId,
            @RequestParam("note") String note) {
        CycleNoteDTO updatedCycleNote = cycleService.updateCycleNote(cycleId, note);

        ApiResponse<CycleNoteDTO> response = new ApiResponse<>(
                200,
                "Update cycle note successfully",
                updatedCycleNote);

        return ResponseEntity.ok(response);
    }

    @Operation(
            summary = "Tạo chu kỳ điều trị mới",
            description = "Khởi tạo chu kỳ điều trị mới cho bệnh nhân, thường được dùng khi bắt đầu một liệu trình hỗ trợ sinh sản."
    )
    @PostMapping("/create")
    public ResponseEntity<ApiResponse<?>> createCycle(
            @RequestBody CreateCycleDTO dto,
            HttpServletRequest request) {

        CycleDTO cycle = cycleService.createCycle(dto, request);

        ApiResponse<CycleDTO> response = new ApiResponse<>(
                200,
                "Cycle created successfully",
                cycle);
        return ResponseEntity.ok(response);

    }
}