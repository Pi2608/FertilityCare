
package hsf302.com.hiemmuon.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import hsf302.com.hiemmuon.entity.Doctor; // Since you're querying Doctor entity

@Repository
public interface ReportRepository extends JpaRepository<Doctor, Long> {


    @Query("SELECT COUNT(d) FROM User d WHERE d.isActive = true and d.role.roleId = 3 ")
    Long countNewActiveDoctorsThisMonth();

    @Query("SELECT COUNT(c) FROM User c WHERE c.isActive = true and c.role.roleId = 4")
    Long countNewActiveCustomersThisMonth();

    @Query("SELECT COUNT(u) FROM User u")
    Long countAllUsers();

    @Query("SELECT COUNT(u) FROM User u WHERE u.role.roleId = :roleId")
    Long countByRole(@Param("roleId") int roleId);



}