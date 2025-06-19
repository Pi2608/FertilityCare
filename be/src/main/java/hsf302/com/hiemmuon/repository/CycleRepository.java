package hsf302.com.hiemmuon.repository;

import hsf302.com.hiemmuon.entity.Cycle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CycleRepository extends JpaRepository<Cycle, Integer> {

    List<Cycle> findByDoctor_DoctorId(int doctorId);

    List<Cycle> findByCustomer_CustomerId(int customerId);

    Cycle findById(int cycleId);
}
