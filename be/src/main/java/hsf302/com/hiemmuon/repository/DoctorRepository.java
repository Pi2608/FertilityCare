package hsf302.com.hiemmuon.repository;

import hsf302.com.hiemmuon.entity.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Integer> {
    Optional<Doctor> findByUserEmail(String email);
    Optional<Doctor> findByUserUserId(int userId);
    List<Doctor> findByIsActiveTrue();
    List<Doctor> findAll();
}
