package hsf302.com.hiemmuon.repository;

import hsf302.com.hiemmuon.entity.TreatmentStep;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TreatmentStepRepository extends JpaRepository<TreatmentStep, Integer> {

    TreatmentStep findByStepOrderAndService_ServiceId(int stepOrder, int serviceId);

    List<TreatmentStep> findAllByService_ServiceId(int serviceId);

    List<TreatmentStep> findByService_ServiceIdOrderByStepOrderAsc(int serviceId);
}