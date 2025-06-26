package hsf302.com.hiemmuon.controller;

import hsf302.com.hiemmuon.dto.createDto.CreatePaymentWithReExamDTO;
import hsf302.com.hiemmuon.dto.entityDto.PaymentResponseDTO;
import hsf302.com.hiemmuon.entity.Payment;
import hsf302.com.hiemmuon.service.PaymentService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    private final PaymentService paymentService;

    @Value("${vnpay.returnUrl")
    private String returnUrl;

    @Value("${vnpay.redirectUrl}")
    private String redirectUrl;

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
        String res = paymentService.createVNPayRedirectUrl(paymentId);
        return ResponseEntity.ok(res);
    }

    @GetMapping("/vnpay-callback")
    public void handleVNPayCallback(@RequestParam Map<String, String> fields, HttpServletResponse response) throws IOException {
        String result = paymentService.processVNPayCallback(fields);

        if (result.equals("Payment successful")) {
            response.sendRedirect(redirectUrl + "?status=success");
        } else {
            response.sendRedirect(redirectUrl + "?status=failure&message=" + URLEncoder.encode(result, StandardCharsets.UTF_8));
        }
    }
}