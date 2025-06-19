//package hsf302.com.hiemmuon.repository;
//
//import hsf302.com.hiemmuon.entity.Doctor;
//import hsf302.com.hiemmuon.entity.DoctorSchedule;
//import org.springframework.data.jpa.repository.JpaRepository;
//
//import java.time.LocalDate;
//import java.time.LocalTime;
//
//public interface DoctorScheduleRepository extends JpaRepository<DoctorSchedule, Integer> {
//    boolean existsByDoctorAndDateAndStartTime(
//            Doctor doctor, LocalDate date, LocalTime startTime);
//}
