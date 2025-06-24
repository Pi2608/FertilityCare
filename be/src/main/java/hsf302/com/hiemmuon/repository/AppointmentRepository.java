package hsf302.com.hiemmuon.repository;

import hsf302.com.hiemmuon.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Integer> {
    List<Appointment> findByCustomer_CustomerIdAndType(int customerId, Appointment.Type type);
    Optional<Appointment> findByAppointmentIdAndCustomer_CustomerId(int appointmentId, int customerId);
    List<Appointment> findByDoctor_DoctorIdAndDateBefore(int doctorId, LocalDateTime now);
    List<Appointment> findAll(); // lấy tất cả lịch hẹn

    Appointment findById(int appointmentId);

    List<Appointment> findByDoctor_DoctorIdAndCustomer_CustomerIdOrderByDateDesc(Integer doctorId, Integer customerId);

    List<Appointment> findByDoctor_DoctorId(int doctorId);
    List<Appointment> findByCustomer_CustomerId(int customerId);
}
