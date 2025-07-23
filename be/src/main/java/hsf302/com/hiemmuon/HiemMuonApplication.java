package hsf302.com.hiemmuon;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication(scanBasePackages = "hsf302.com.hiemmuon")
public class HiemMuonApplication
//        implements CommandLineRunner
{

    public static void main(String[] args) {
        SpringApplication.run(HiemMuonApplication.class, args);
    }


}