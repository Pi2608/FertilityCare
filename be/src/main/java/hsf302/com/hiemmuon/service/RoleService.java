package hsf302.com.hiemmuon.service;

import hsf302.com.hiemmuon.entity.Role;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface RoleService {
    List<Role> findAll();
    Role findByRoleName(String roleName);
}
