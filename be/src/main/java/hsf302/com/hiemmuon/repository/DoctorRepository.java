package hsf302.com.hiemmuon.repository;

import hsf302.com.hiemmuon.entity.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Integer> {

    Doctor findByUser_Name(String name);

    List<Doctor> findAll();

    List<Doctor> findByUser_IsActive(boolean isActive);



}