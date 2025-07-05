package hsf302.com.hiemmuon.controller;

import hsf302.com.hiemmuon.dto.createDto.SendMessageDTO;
import hsf302.com.hiemmuon.dto.responseDto.LastMessageDTO;
import hsf302.com.hiemmuon.dto.responseDto.MessageViewDTO;
import hsf302.com.hiemmuon.entity.User;
import hsf302.com.hiemmuon.service.MessageService;
import hsf302.com.hiemmuon.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/messages")
public class MessageController {
    @Autowired
    private MessageService messageService;
    @Autowired
    private UserService userService;

    // Lấy tất cả tin nhắn giữa current user và đối phương
    @GetMapping("/with/{otherUserId}")
    public ResponseEntity<List<MessageViewDTO>> getConversation(@PathVariable int otherUserId) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User currentUser = userService.getUserByEmail(email);

        List<MessageViewDTO> messages = messageService.getConversation(currentUser.getUserId(), otherUserId);
        return ResponseEntity.ok(messages);
    }

    // Gửi tin nhắn (sender tự động lấy từ token)
    @PostMapping("/send")
    public ResponseEntity<MessageViewDTO> sendMessage(@RequestBody SendMessageDTO dto) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User sender = userService.getUserByEmail(email);

        MessageViewDTO message = messageService.sendMessage(sender.getUserId(), dto.getReceiverId(), dto.getMessage());
        return ResponseEntity.ok(message);
    }

    @GetMapping("/latest")
    public ResponseEntity<List<LastMessageDTO>> getLatestMessages() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User currentUser = userService.getUserByEmail(email);

        List<LastMessageDTO> result = messageService.getLatestMessagesOfUser(currentUser.getUserId());
        return ResponseEntity.ok(result);
    }


}
