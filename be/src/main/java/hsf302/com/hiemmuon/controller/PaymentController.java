package hsf302.com.hiemmuon.controller;

import hsf302.com.hiemmuon.dto.createDto.CreatePaymentWithReExamDTO;
import hsf302.com.hiemmuon.dto.entityDto.PaymentResponseDTO;
import hsf302.com.hiemmuon.entity.Payment;
import hsf302.com.hiemmuon.service.PaymentService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    private final PaymentService paymentService;

    @Value("${vnpay.returnUrl}")
    private String returnUrl;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<PaymentResponseDTO>> getAllPayments() {
        List<PaymentResponseDTO> payments = paymentService.getAllPayments();
        return ResponseEntity.ok(payments);
    }

    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<PaymentResponseDTO>> getPaymentsByCustomerId(@PathVariable int customerId) {
        List<PaymentResponseDTO> payments = paymentService.getPaymentsByCustomerId(customerId);
        return ResponseEntity.ok(payments);
    }

    @PostMapping
    public ResponseEntity<PaymentResponseDTO> createPayment(HttpServletRequest request, @RequestBody CreatePaymentWithReExamDTO dto) {
        PaymentResponseDTO payment = paymentService.createPayment(request, dto);
        return ResponseEntity.ok(payment);
    }

    @PutMapping("/cancel/{id}")
    public ResponseEntity<PaymentResponseDTO> cancelPayment(@PathVariable int paymentId) {
        PaymentResponseDTO payment = paymentService.cancelPayment(paymentId);
        return ResponseEntity.ok(payment);
    }

    @PostMapping("/vnpay")
    public ResponseEntity<String> createVNPayUrl(@RequestBody int paymentId) {
        String res = paymentService.createVNPayRedirectUrl(paymentId, returnUrl);
        return ResponseEntity.ok(res);
    }

    @GetMapping("/vnpay-callback")
    public ResponseEntity<?> vnpayCallback(@RequestParam Map<String, String> allParams) {
        try {
            String result = paymentService.processVNPayCallback(allParams);
            return ResponseEntity.ok(Map.of(
                    "status", "success",
                    "message", result
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                    "status", "error",
                    "message", e.getMessage()
            ));
        }
    }
}