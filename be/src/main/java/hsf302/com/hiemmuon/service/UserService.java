package hsf302.com.hiemmuon.service;

import hsf302.com.hiemmuon.entity.User;
import org.springframework.stereotype.Service;

@Service
public interface UserService {
    User getUserByEmail(String email);
}
