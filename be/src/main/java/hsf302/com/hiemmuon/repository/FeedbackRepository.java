package hsf302.com.hiemmuon.repository;

import hsf302.com.hiemmuon.dto.feedback.FeedbackViewDTO;
import hsf302.com.hiemmuon.entity.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FeedbackRepository extends JpaRepository<Feedback, Integer> {

    @Query("SELECT AVG(f.rating) FROM Feedback f WHERE f.doctor.doctorId = :doctorId")
    Double getAverageRatingByDoctorId(@Param("doctorId") int doctorId);

    // Lấy tất cả feedback (manager)
    @Query("""
    SELECT new hsf302.com.hiemmuon.dto.responseDto.FeedbackViewDTO(
        f.feedbackId, f.comment, f.rating, f.createAt,
        f.doctor.doctorId, f.doctor.user.name,
        f.customer.customerId, f.customer.user.name
    )
    FROM Feedback f
""")
    List<FeedbackViewDTO> getAllFeedbacksView();

    // Theo doctor
    @Query("""
    SELECT new hsf302.com.hiemmuon.dto.responseDto.FeedbackViewDTO(
        f.feedbackId, f.comment, f.rating, f.createAt,
        f.doctor.doctorId, f.doctor.user.name,
        f.customer.customerId, f.customer.user.name
    )
    FROM Feedback f
    WHERE f.doctor.doctorId = :doctorId
""")
    List<FeedbackViewDTO> getByDoctor(@Param("doctorId") int doctorId);

    // Theo customer
    @Query("""
    SELECT new hsf302.com.hiemmuon.dto.responseDto.FeedbackViewDTO(
        f.feedbackId, f.comment, f.rating, f.createAt,
        f.doctor.doctorId, f.doctor.user.name,
        f.customer.customerId, f.customer.user.name
    )
    FROM Feedback f
    WHERE f.customer.customerId = :customerId
""")
    List<FeedbackViewDTO> getByCustomer(@Param("customerId") int customerId);







}
