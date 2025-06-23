package hsf302.com.hiemmuon.repository;

import hsf302.com.hiemmuon.entity.Medicine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MedicineRepository extends JpaRepository<Medicine, Integer> {
    List<Medicine> findByTreatmentStep_Id(int treatmentStepId);
}
