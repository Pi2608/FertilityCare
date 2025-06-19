package hsf302.com.hiemmuon;

import hsf302.com.hiemmuon.entity.User;
import hsf302.com.hiemmuon.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.security.crypto.password.PasswordEncoder;


@SpringBootApplication(scanBasePackages = "hsf302.com.hiemmuon")
public class HiemMuonApplication
//        implements CommandLineRunner
{

    public static void main(String[] args) {
        SpringApplication.run(HiemMuonApplication.class, args);
    }

//    @Autowired
//    private UserRepository userRepository;
//
//    @Autowired
//    private PasswordEncoder passwordEncoder;

//    @Override
//    public void run(String... args) throws Exception {
//        encodeExistingPasswords();
//    }
//    public void encodeExistingPasswords() {
//        List<User> users = userRepository.findAll();
//        for (User user : users) {
//            String rawPassword = user.getPassword();
//
//            if (rawPassword == null) continue;
//
//            if (!rawPassword.startsWith("$2a$")) {
//                String encoded = passwordEncoder.encode(rawPassword);
//                user.setPassword(encoded);
//                userRepository.save(user);
//                System.out.println("Đã mã hóa mật khẩu cho user: " + user.getEmail());
//            }
//        }
//    }
}
