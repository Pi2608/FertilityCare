package hsf302.com.hiemmuon.repository;

import hsf302.com.hiemmuon.entity.Manager;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ManagerRepository extends JpaRepository<Manager, Integer> {
    @Query("SELECT COUNT(m) FROM Manager m")
    Long countAllManagers();

    @Query("SELECT COUNT(m) FROM Manager m WHERE m.isActive = true")
    Long countActiveManagers();
}
