package hsf302.com.hiemmuon.repository;

import hsf302.com.hiemmuon.entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Integer> {
    @Query("SELECT COUNT(a) FROM Admin a")
    Long countAllAdmins();

    @Query("SELECT COUNT(a) FROM Admin a WHERE a.isActive = true")
    Long countActiveAdmins();

}
