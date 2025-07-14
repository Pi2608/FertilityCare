package hsf302.com.hiemmuon.service;

import hsf302.com.hiemmuon.dto.customer.RegisterCustomerDTO;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@Service
public class SendMailService {

    @Autowired
    private JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String mailFrom;

    private String lastOtp;

    private Instant otpTimeStamp;

    public void sendOtp(String email, String name) {
        String otp = String.format("%06d", new Random().nextInt(999999));

        this.lastOtp = otp;
        this.otpTimeStamp = Instant.now();

        String body = """
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <style>
        body {
            font-family: 'Segoe UI', sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .email-container {
            background-color: #ffffff;
            margin: 50px auto;
            padding: 30px;
            max-width: 600px;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.05);
        }
        h1 {
            color: #2c3e50;
        }
        p {
            color: #34495e;
            font-size: 16px;
        }
        .otp-box {
            font-size: 24px;
            color: #e74c3c;
            font-weight: bold;
            text-align: center;
            margin: 20px auto;
            padding: 15px 25px;
            border: 2px dashed #e74c3c;
            border-radius: 8px;
            background-color: #fff5f5;
            width: fit-content;
        }
        .footer {
            font-size: 12px;
            color: #95a5a6;
            text-align: center;
            margin-top: 30px;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <h1>Xin chào, %s!</h1>
        <p>Chào mừng bạn đến với <strong>FercilyCare</strong>.</p>
        <p>Chúng tôi rất vui khi bạn đồng hành cùng chúng tôi trong hành trình chăm sóc sức khỏe sinh sản.</p>
        <div class="otp-box">Mã OTP của bạn là: %s</div>
        <p>Vui lòng không chia sẻ mã này với bất kỳ ai. Mã sẽ hết hạn sau vài phút.</p>
        <div class="footer">
            © 2025 FercilyCare - Chăm sóc bằng cả trái tim 💗
        </div>
    </div>
</body>
</html>
""".formatted(name, otp);

        MimeMessage message = mailSender.createMimeMessage();
        try {
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setFrom(mailFrom);
            helper.setTo(email);
            helper.setText(body, true);
            helper.setSubject("OTP for Fertility Care");

            mailSender.send(message);
        } catch (Exception e) {
            throw new RuntimeException("Failed to create email message", e);
        }
    }

    private Map<String, RegisterCustomerDTO> pendingData = new HashMap<>();
    private Map<String, OtpInfo> otpStore = new HashMap<>(); // email -> otp + timestamp

    public void storePendingRegistration(RegisterCustomerDTO dto) {
        pendingData.put(dto.getEmail(), dto);

        String otp = String.format("%06d", new Random().nextInt(999999));
        otpStore.put(dto.getEmail(), new OtpInfo(otp, Instant.now()));
    }

    public boolean validOtp(String email, String otp) {
        if (this.lastOtp == null || this.otpTimeStamp == null) {
            return false;
        }

        Instant now = Instant.now();
        long secondsSinceOtp = now.getEpochSecond() - otpTimeStamp.getEpochSecond();

        // Kiểm tra xem OTP có hợp lệ trong vòng 5 phút
        if (secondsSinceOtp > 300) {
            this.lastOtp = null;
            this.otpTimeStamp = null;
            return false;
        }

        boolean isValid = this.lastOtp.equals(otp);
        if(isValid){
            this.lastOtp= null;
            this.otpTimeStamp = null;
        }

        return isValid;
    }

    public RegisterCustomerDTO getPendingRegistration(String email) {
        return pendingData.remove(email); // lấy ra và xoá luôn
    }

    static class OtpInfo {
        private String otp;
        private Instant createdAt;

        public OtpInfo(String otp, Instant createdAt) {
            this.otp = otp;
            this.createdAt = createdAt;
        }

        public String getOtp() { return otp; }
        public Instant getCreatedAt() { return createdAt; }
    }
}
