package hsf302.com.hiemmuon.repository;

import hsf302.com.hiemmuon.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    boolean existsByEmail(String email);

    User findByEmail(String email);

    User getRoleByUserId(int userId);

}
