package hsf302.com.hiemmuon.repository;

import hsf302.com.hiemmuon.entity.SuccessRateByAge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SuccessRateByAgeRepository extends JpaRepository<SuccessRateByAge, Long> {
    List<SuccessRateByAge> findByTreatmentService_ServiceId(int serviceId);
}
