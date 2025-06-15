package hsf302.com.hiemmuon.repository;

import hsf302.com.hiemmuon.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    boolean existsByEmail(String email);


    @Query("SELECT u FROM User u JOIN FETCH u.role WHERE u.email = :email")
    User GetByEmail(@Param("email") String email);

    Optional<User> findByEmail(String email); // ✅ Đúng

}
