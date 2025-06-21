//package hsf302.com.hiemmuon.service;
//
//import hsf302.com.hiemmuon.entity.Doctor;
//import hsf302.com.hiemmuon.entity.DoctorSchedule;
//import hsf302.com.hiemmuon.repository.DoctorRepository;
//import hsf302.com.hiemmuon.repository.DoctorScheduleRepository;
//import jakarta.annotation.PostConstruct;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.scheduling.annotation.Scheduled;
//import org.springframework.stereotype.Service;
//
//import java.time.LocalDate;
//import java.time.LocalTime;
//import java.util.ArrayList;
//import java.util.List;
//
//@Configuration
//@Service
//public class DoctorScheduleService {
//
//    private static final Logger logger = LoggerFactory.getLogger(DoctorScheduleService.class);
//
//    @Autowired
//    private DoctorRepository doctorRepository;
//
//    @Autowired
//    private DoctorScheduleRepository doctorScheduleRepository;
//
//    // Chạy tự động mỗi ngày lúc 1:00 sáng
////        @Scheduled(cron = "0 0 1 * * *")
//    @Scheduled(cron = "0 * * * * *") // Mỗi phút chạy 1 lần
//    public void autoGenerateSchedulesForAllDoctors() {
//        List<Doctor> doctors = doctorRepository.findByIsActive(true);
//        List<DoctorSchedule> schedulesToSave = new ArrayList<>();
//        int totalCreated = 0;
//
//        LocalDate today = LocalDate.now();
//        LocalDate endDate = today.plusDays(30);
//
//        for (Doctor doctor : doctors) {
//            for (LocalDate date = today; !date.isAfter(endDate); date = date.plusDays(1)) {
//
//                // Ca sáng: 08:00 - 11:00
//                if (!doctorScheduleRepository.existsByDoctorAndDateAndStartTime(doctor, date, LocalTime.of(8, 0))) {
//                    schedulesToSave.add(new DoctorSchedule(doctor, date, LocalTime.of(8, 0), LocalTime.of(11, 0), true));
//                    totalCreated++;
//                }
//
//                // Ca chiều: 14:00 - 17:00
//                if (!doctorScheduleRepository.existsByDoctorAndDateAndStartTime(doctor, date, LocalTime.of(14, 0))) {
//                    schedulesToSave.add(new DoctorSchedule(doctor, date, LocalTime.of(14, 0), LocalTime.of(17, 0), true));
//                    totalCreated++;
//                }
//            }
//        }
//
//        doctorScheduleRepository.saveAll(schedulesToSave);
//        logger.info("🗓️ AutoSchedule: Đã tạo {} ca làm việc mới cho 30 ngày tới.", totalCreated);
//    }
//}