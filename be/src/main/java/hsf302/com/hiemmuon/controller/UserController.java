package hsf302.com.hiemmuon.controller;

import hsf302.com.hiemmuon.dto.createDto.CreateManagerRequest;
import hsf302.com.hiemmuon.entity.User;
import hsf302.com.hiemmuon.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/create-manager")
    public ResponseEntity<?> createManager(@RequestBody CreateManagerRequest request) {
        try {
            User created = userService.createManager(request);
            return ResponseEntity.ok(created);
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }
}
