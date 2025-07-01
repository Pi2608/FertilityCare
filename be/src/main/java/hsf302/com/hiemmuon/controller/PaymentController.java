package hsf302.com.hiemmuon.controller;

import hsf302.com.hiemmuon.dto.createDto.CreatePaymentWithReExamDTO;
import hsf302.com.hiemmuon.dto.responseDto.PaymentResponsesDTO;
import hsf302.com.hiemmuon.entity.Payment;
import hsf302.com.hiemmuon.service.PaymentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Map;

@Tag(name = "10. Payment Controller")
@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    private final PaymentService paymentService;

    @Value("${vnpay.returnUrl}")
    private String returnUrl;

    @Value("${vnpay.redirectUrl}")
    private String redirectUrl;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @Operation(
            summary = "Lấy danh sách tất cả các giao dịch (A, M)",
            description = "API lấy danh sách tất cả giao dịch của tất cả người dường"
    )
    @PreAuthorize("hasAnyRole('ADMIN', 'MANAGER')")
    @GetMapping("/all")
    public ResponseEntity<List<PaymentResponsesDTO>> getAllPayments() {
        List<PaymentResponsesDTO> payments = paymentService.getAllPayments();
        return ResponseEntity.ok(payments);
    }

    @Operation(
            summary = "Lấy danh sách tất cả giao dịch (C)",
            description = "Lấy danh sách tất cả giao dịch của bệnh nhân đang đăng nhập"
    )
    @PreAuthorize("hasRole('CUSTOMER')")
    @GetMapping("/customer")
    public ResponseEntity<List<PaymentResponsesDTO>> getPaymentsByCustomerId(HttpServletRequest request) {
        List<PaymentResponsesDTO> payments = paymentService.getPaymentsByCustomerId(request);
        return ResponseEntity.ok(payments);
    }

    @Operation(
        summary = "Lấy danh sách giao dịch chưa thanh toán (C)",
        description = "Lấy danh sách giao dịch chưa thanh toán của bệnh nhân đang đăng nhập"
    )
    @PreAuthorize("hasRole('CUSTOMER')")
    @GetMapping("/pending/customer")
    public ResponseEntity<List<PaymentResponsesDTO>> getPendingPaymentsByCustomerId(HttpServletRequest request) {
        try {
            List<PaymentResponsesDTO> pendingPayments = paymentService.getPendingPaymentsByCustomerId(request);
            return ResponseEntity.ok(pendingPayments);
        } catch (Exception e) {
            System.err.println("Error getting payment: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }

    @Operation(
            summary = "Tạo giao dịch cho bệnh nhân (D)",
            description = "Tạo giao dịch cho bệnh nhân - chỉ định dịch vụ"
    )
    @PreAuthorize("hasAnyRole('DOCTOR')")
    @PostMapping
    public ResponseEntity<PaymentResponsesDTO> createPayment(
            HttpServletRequest request,
            @RequestBody CreatePaymentWithReExamDTO dto) {

        System.out.println("Received payment data: " + dto.toString());

        try {
            PaymentResponsesDTO payment = paymentService.createPayment(request, dto);
            return ResponseEntity.ok(payment);
        } catch (Exception e) {
            System.err.println("Error creating payment: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }

    @Operation(
            summary = "Hủy giao dịch (C)",
            description = "Hủy giao dịch"
    )
    @PreAuthorize("hasRole('CUSTOMER')")
    @PutMapping("/cancel")
    public ResponseEntity<PaymentResponsesDTO> cancelPayment(@RequestBody int paymentId) {
        PaymentResponsesDTO payment = paymentService.cancelPayment(paymentId);
        return ResponseEntity.ok(payment);
    }

    @Operation(
            summary = "Tạo Url thanh toán (C)",
            description = "Tạo Url thanh toán để thực hiện thanh toán"
    )
    @PreAuthorize("hasRole('CUSTOMER')")
    @PostMapping("/vnpay")
    public ResponseEntity<String> createVNPayUrl(@RequestBody int paymentId) {
        String res = paymentService.createVNPayRedirectUrl(paymentId);
        return ResponseEntity.ok(res);
    }

    @Operation(
            summary = "Hồi đáp kết quả giao dịch (C)",
            description = "Nhận kết quả thanh toán của VNPay"
    )
    @PreAuthorize("hasRole('CUSTOMER')")
    @GetMapping("/vnpay-callback")
    public void handleVNPayCallback(@RequestParam Map<String, String> fields, HttpServletResponse response, HttpServletRequest request) throws IOException {
        String result = paymentService.processVNPayCallback(request, fields);

        if (result.equals("Payment successful")) {
            response.sendRedirect(redirectUrl + "?status=success");
        } else {
            response.sendRedirect(redirectUrl + "?status=failure&message=" + URLEncoder.encode(result, StandardCharsets.UTF_8));
        }
    }
}