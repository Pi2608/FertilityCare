package hsf302.com.hiemmuon.service;

import hsf302.com.hiemmuon.entity.Role;
import hsf302.com.hiemmuon.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoleService {
    @Autowired
    private RoleRepository roleRepository;

    public Role save(Role role) {
        return roleRepository.save(role);
    }

    public Role findByName(String name) {
        return roleRepository.findByRoleName(name);
    }
}