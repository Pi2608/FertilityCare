package hsf302.com.hiemmuon.repository;

import hsf302.com.hiemmuon.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    boolean existsByEmail(String email);

    User findByEmail(String email);

    User getRoleByUserId(int userId);

    User getUserByUserId(int userId);


    Long countUserByRole_RoleId(int roleId);

    Long countUserByRole_RoleIdAndIsActive(int roleId, boolean isActive);
}