package hsf302.com.hiemmuon.service;

import hsf302.com.hiemmuon.dto.createDto.CreateCycleDTO;
import hsf302.com.hiemmuon.dto.createDto.ReExamAppointmentDTO;
import hsf302.com.hiemmuon.dto.createDto.CreatePaymentWithReExamDTO;
import hsf302.com.hiemmuon.dto.responseDto.CycleDTO;
import hsf302.com.hiemmuon.dto.responseDto.PaymentResponsesDTO;
import hsf302.com.hiemmuon.entity.*;
import hsf302.com.hiemmuon.enums.StatusCycle;
import hsf302.com.hiemmuon.enums.StatusPayment;
import hsf302.com.hiemmuon.exception.NotFoundException;
import hsf302.com.hiemmuon.repository.*;
import hsf302.com.hiemmuon.utils.VNPayUtil;
import io.jsonwebtoken.Claims;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class PaymentService {

    private final PaymentRepository paymentRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private CycleRepository cycleRepository;

    @Autowired
    private CycleStepRepository cycleStepRepository;

    @Autowired
    private TreatmentServiceRepository treatmentServiceRepository;

    @Autowired
    private AppointmentService appointmentService;

    @Autowired
    private CycleService cycleService;

    @Autowired
    private JwtService jwtService;

    @Value("${vnpay.tmnCode}")
    private String vnp_TmnCode;

    @Value("${vnpay.hashSecret}")
    private String vnp_HashSecret;

    @Value("${vnpay.payUrl}")
    private String vnp_PayUrl;

    @Value("${vnpay.returnUrl}")
    private String vnp_Return;

    private LocalDateTime firstAptDate;

    public PaymentService(PaymentRepository paymentRepository) {
        this.paymentRepository = paymentRepository;
    }

    boolean isValidTransition(StatusPayment from, StatusPayment to) {
        return switch (from) {
            case pending -> to == StatusPayment.paid || to == StatusPayment.failed;
            case failed, paid -> false;
        };
    }


    public List<PaymentResponsesDTO> getAllPayments() {
        List<Payment> payments = paymentRepository.findAll();
        return payments.stream()
                .map(PaymentResponsesDTO::fromPayment)
                .collect(Collectors.toList());
    }

    public List<PaymentResponsesDTO> getPaymentsByCustomerId(HttpServletRequest request) {
        final String authHeader = request.getHeader("Authorization");
        final String token = authHeader.substring(7);
        Claims claims = jwtService.extractAllClaims(token);

        Object customerIdObj = claims.get("userId");
        Integer customerId = Integer.parseInt(customerIdObj.toString());
        List<Payment> payments = paymentRepository.findByCustomerId(customerId);
        return payments.stream()
                .map(PaymentResponsesDTO::fromPayment)
                .collect(Collectors.toList());
    }

    public List<PaymentResponsesDTO> getPendingPaymentsByCustomerId(HttpServletRequest request) {
        final String authHeader = request.getHeader("Authorization");
        final String token = authHeader.substring(7);
        Claims claims = jwtService.extractAllClaims(token);

        Object customerIdObj = claims.get("userId");
        Integer customerId = Integer.parseInt(customerIdObj.toString());
        List<Payment> pendingPayments = paymentRepository.findByCustomerIdAndStatus(customerId, StatusPayment.pending);
        return pendingPayments.stream()
                .map(PaymentResponsesDTO::fromPayment)
                .collect(Collectors.toList());
    }

    public PaymentResponsesDTO createPayment(HttpServletRequest request, CreatePaymentWithReExamDTO dto) {
        final String authHeader = request.getHeader("Authorization");
        final String token = authHeader.substring(7);
        Claims claims = jwtService.extractAllClaims(token);

        Object doctorIdObj = claims.get("userId");
        Integer doctorId = Integer.parseInt(doctorIdObj.toString());
        Doctor doc = doctorRepository.findById(doctorId).orElseThrow();
        if (dto == null) {
            throw new IllegalArgumentException("DTO null");
        }

//        ReExamAppointmentDTO reExamDto = new ReExamAppointmentDTO();
//        reExamDto.setCustomerId(dto.getCustomerId());
//        reExamDto.setDate(dto.getAppointmentDate());
//        reExamDto.setServiceId(dto.getServiceId());
//        reExamDto.setNote(dto.getNote());
//
//        AppointmentHistoryDTO appointmentHistory = appointmentService.scheduleReExam(reExamDto, doc);
//
        Appointment appointment = appointmentRepository.findById(dto.getAppointmentId());

        if (appointment == null) {
            throw new RuntimeException("Không thể tạo appointment tái khám");
        }

        // Get customer and service
        Customer customer = customerRepository.findByCustomerId(dto.getCustomerId());
        if (customer == null) {
            throw new RuntimeException("Không tìm thấy khách hàng với ID: " + dto.getCustomerId());
        }

        TreatmentService service = treatmentServiceRepository.findById(dto.getServiceId());
        if (service == null) {
            throw new RuntimeException("Không tìm thấy dịch vụ với ID: " + dto.getServiceId());
        }

        CreateCycleDTO createCycle = new CreateCycleDTO();
        createCycle.setCustomerId(dto.getCustomerId());
        createCycle.setServiceId(dto.getServiceId());
        createCycle.setStartDate(dto.getAppointmentDate().toLocalDate());
        createCycle.setNote("Bệnh nhân bắt đầu chu trình điều trị hiếm muộn tại cơ sở.");
        CycleDTO cycledDto = cycleService.createCycle(createCycle, request);

        firstAptDate = dto.getAppointmentDate();

        Cycle cycle = cycleRepository.findById(cycledDto.getCycleId());

        Payment payment = new Payment();
        payment.setCustomer(customer);
        payment.setAppointment(appointment);
        payment.setService(service);
        payment.setCycle(cycle);
        payment.setTotal(dto.getTotal());
        payment.setPaid(dto.getPaidDate());
        payment.setStatus(dto.getStatus() != null ? dto.getStatus() : StatusPayment.pending);
        payment.setType(dto.getType());

        Payment savedPayment = paymentRepository.save(payment);
        return PaymentResponsesDTO.fromPayment(savedPayment);
    }

    public void updatePaymentStatus(int paymentId, StatusPayment status) {
        Payment payment = paymentRepository.findById(paymentId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy payment với ID: " + paymentId));

        if (!isValidTransition(payment.getStatus(), status)) {
            throw new RuntimeException("Chuyển trạng thái không hợp lệ từ " + payment.getStatus() + " sang " + status);
        }

        payment.setStatus(status);

        if (status == StatusPayment.paid) {
            payment.setPaid(LocalDateTime.now());
        }

        if (status == StatusPayment.failed) {
            payment.getCycle().setStatus(StatusCycle.stopped);
        }

        paymentRepository.save(payment);
    }

    public PaymentResponsesDTO cancelPayment(int paymentId) {
        Payment payment = paymentRepository.findById(paymentId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy payment với ID: " + paymentId));

        // Only allow cancellation if payment is not already completed
        if (!isValidTransition(payment.getStatus(), StatusPayment.failed)) {
            throw new RuntimeException("Không thể hủy payment từ trạng thái " + payment.getStatus());
        }

        payment.getCycle().setStatus(StatusCycle.stopped);
        payment.setStatus(StatusPayment.failed);
        Payment savedPayment = paymentRepository.save(payment);
        return PaymentResponsesDTO.fromPayment(savedPayment);
    }

    public String createVNPayRedirectUrl(int paymentId) {
        String txnRef = paymentId + "-" + System.currentTimeMillis();
        Payment payment = paymentRepository.findById(paymentId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy payment với ID: " + paymentId));

        String serviceId = String.valueOf(paymentId);

        Map<String, String> vnp_Params = new HashMap<>();
        vnp_Params.put("vnp_Version", "2.1.0");
        vnp_Params.put("vnp_Command", "pay");
        vnp_Params.put("vnp_TmnCode", vnp_TmnCode);
        vnp_Params.put("vnp_Amount", payment.getTotal().multiply(BigDecimal.valueOf(100)).toBigInteger().toString());
        vnp_Params.put("vnp_CurrCode", "VND");
        vnp_Params.put("vnp_TxnRef", txnRef);
        vnp_Params.put("vnp_OrderInfo", "Thanh toan dich vu: " + serviceId);
        vnp_Params.put("vnp_OrderType", "other");
        vnp_Params.put("vnp_Locale", "vn");
        vnp_Params.put("vnp_ReturnUrl", vnp_Return);
        vnp_Params.put("vnp_IpAddr", "127.0.0.1");
        vnp_Params.put("vnp_CreateDate", LocalDateTime.now().format(java.time.format.DateTimeFormatter.ofPattern("yyyyMMddHHmmss")));

        String vnp_SecureHash = VNPayUtil.generateSecureHash(vnp_Params, vnp_HashSecret);

        String queryString = VNPayUtil.createQueryString(vnp_Params);

        return vnp_PayUrl + "?" + queryString + "&vnp_SecureHash=" + vnp_SecureHash;
    }

    public String processVNPayCallback(HttpServletRequest request, Map<String, String> fields) {
        try {
            // Verify signature using utility method
            if (!VNPayUtil.verifySignature(fields, vnp_HashSecret)) {
                return "Invalid signature";
            }

            String vnp_ResponseCode = fields.get("vnp_ResponseCode");
            String vnp_TxnRef = fields.get("vnp_TxnRef");

            if (vnp_TxnRef == null || vnp_TxnRef.isEmpty()) {
                return "Missing transaction reference";
            }

            try {
                String[] parts = vnp_TxnRef.split("-");
                int paymentId = Integer.parseInt(parts[0]);
                Payment payment = paymentRepository.findById(paymentId).orElseThrow(() -> new NotFoundException("Không tìm thấy Payment ID: " + paymentId));
                Customer customer = payment.getCustomer();
                Appointment appointment = payment.getAppointment();
                Doctor doctor = appointment.getDoctor();

                if ("00".equals(vnp_ResponseCode)) {
                    ReExamAppointmentDTO newApt = new ReExamAppointmentDTO();
                    newApt.setCustomerId(payment.getCustomer().getCustomerId());
                    newApt.setServiceId(payment.getService().getServiceId());
                    newApt.setDate(firstAptDate);
                    newApt.setNote("");
                    List<Integer> stepIds = cycleStepRepository.findStepIdsByCycleIdOrdered(payment.getCycle().getCycleId());
                    if (stepIds.isEmpty()) throw new NotFoundException("No steps found");
                    newApt.setCycleStepId(stepIds.get(0));
                    appointmentService.scheduleReExam(newApt, doctor);
                    updatePaymentStatus(paymentId, StatusPayment.paid);
                    return "Payment successful";
                } else {
                    updatePaymentStatus(paymentId, StatusPayment.failed);
                    return "Payment failed with code: " + vnp_ResponseCode;
                }
            } catch (NumberFormatException e) {
                throw e;
            }
        } catch (Exception e) {
            throw e;
        }
    }
}