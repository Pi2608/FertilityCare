package hsf302.com.hiemmuon.repository;

import hsf302.com.hiemmuon.entity.DoctorSchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Repository
public interface AppointmentServiceRepository extends JpaRepository<DoctorSchedule, Integer> {
    List<DoctorSchedule> findByDoctor_DoctorIdAndDateAndStatus(
            int doctorId, LocalDate date, Boolean status

    );

    @Query(value = """
    SELECT * FROM doctor_schedules 
    WHERE doctor_id = :doctorId 
      AND date = :date 
      AND start_time = CAST(:startTime AS TIME)
    """, nativeQuery = true)
    DoctorSchedule findScheduleByDoctorDateTime(
            @Param("doctorId") int doctorId,
            @Param("date") LocalDate date,
            @Param("startTime") LocalTime startTime
    );



}
