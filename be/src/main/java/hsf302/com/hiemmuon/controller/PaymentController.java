package hsf302.com.hiemmuon.controller;

import hsf302.com.hiemmuon.dto.createDto.CreatePaymentWithReExamDTO;
import hsf302.com.hiemmuon.dto.responseDto.PaymentResponsesDTO;
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

    @Value("${vnpay.returnUrl}")
    private String returnUrl;

    @Value("${vnpay.redirectUrl}")
    private String redirectUrl;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<PaymentResponsesDTO>> getAllPayments() {
        List<PaymentResponsesDTO> payments = paymentService.getAllPayments();
        return ResponseEntity.ok(payments);
    }

    @GetMapping("/customer")
    public ResponseEntity<List<PaymentResponsesDTO>> getPaymentsByCustomerId(HttpServletRequest request) {
        List<PaymentResponsesDTO> payments = paymentService.getPaymentsByCustomerId(request);
        return ResponseEntity.ok(payments);
    }

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

    @PutMapping("/cancel")
    public ResponseEntity<PaymentResponsesDTO> cancelPayment(@RequestBody int paymentId) {
        PaymentResponsesDTO payment = paymentService.cancelPayment(paymentId);
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