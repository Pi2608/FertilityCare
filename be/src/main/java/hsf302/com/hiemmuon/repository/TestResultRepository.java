package hsf302.com.hiemmuon.repository;

import hsf302.com.hiemmuon.dto.testresult.TestResultViewDTO;
import hsf302.com.hiemmuon.entity.TestResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TestResultRepository extends JpaRepository<TestResult, Integer> {
    List<TestResult> findByAppointment_AppointmentId(Integer appointmentId);
    @Query("""
    SELECT new hsf302.com.hiemmuon.dto.testresult.TestResultViewDTO(
        r.name, r.value, r.unit, r.referenceRange,
        r.testDate, r.note, r.appointment.note, r.appointment.cycleStep.description
    )
    FROM TestResult r
    WHERE r.appointment.customer.customerId = :customerId
""")
    List<TestResultViewDTO> getResultsByCustomerId(@Param("customerId") int customerId);
}