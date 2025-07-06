package hsf302.com.hiemmuon.controller;

import hsf302.com.hiemmuon.dto.ApiResponse;
import hsf302.com.hiemmuon.dto.createDto.SendMessageDTO;
import hsf302.com.hiemmuon.dto.responseDto.LastMessageDTO;
import hsf302.com.hiemmuon.dto.responseDto.MessageViewDTO;
import hsf302.com.hiemmuon.entity.User;
import hsf302.com.hiemmuon.service.MessageService;
import hsf302.com.hiemmuon.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "12. Message Controller")
@RestController
@RequestMapping("/api/messages")
public class MessageController {
    @Autowired
    private MessageService messageService;
    @Autowired
    private UserService userService;

    @Operation(
            summary = "Lấy toàn bộ tin nhắn giữa người dùng hiện tại và người đối thoại",
            description = "Trả về danh sách các tin nhắn đã trao đổi giữa người đăng nhập hiện tại và user có ID được truyền vào."
    )
    @GetMapping("/with/{otherUserId}")
    public ResponseEntity<ApiResponse<List<MessageViewDTO>>> getConversation(@PathVariable int otherUserId) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User currentUser = userService.getUserByEmail(email);

        List<MessageViewDTO> messages = messageService.getConversation(currentUser.getUserId(), otherUserId);

        ApiResponse<List<MessageViewDTO>> response = new ApiResponse<>(
                200,
                "Lấy tin nhắn thành công",
                messages
        );

        return ResponseEntity.ok(response);
    }


    @Operation(
            summary = "Gửi tin nhắn đến người dùng khác",
            description = "Người dùng hiện tại (lấy từ token) sẽ gửi tin nhắn đến người nhận thông qua ID và nội dung được cung cấp."
    )
    @PostMapping("/send")
    public ResponseEntity<ApiResponse<MessageViewDTO>> sendMessage(@RequestBody SendMessageDTO dto) {
        // Lấy sender từ token
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User sender = userService.getUserByEmail(email);

        // Gửi tin nhắn
        MessageViewDTO message = messageService.sendMessage(
                sender.getUserId(),
                dto.getReceiverId(),
                dto.getMessage()
        );

        // Chuẩn hóa response
        ApiResponse<MessageViewDTO> response = new ApiResponse<>(
                200,
                "Gửi tin nhắn thành công",
                message
        );

        return ResponseEntity.ok(response);
    }


    @Operation(
            summary = "Lấy tin nhắn cuối cùng giữa người dùng hiện tại và mỗi người đã từng trò chuyện",
            description = "Trả về danh sách tin nhắn gần nhất với mỗi người dùng mà người hiện tại đã từng gửi/nhận tin nhắn."
    )
    @GetMapping("/latest")
    public ResponseEntity<ApiResponse<List<LastMessageDTO>>> getLatestMessages() {
        // Lấy người dùng hiện tại từ token
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        User currentUser = userService.getUserByEmail(email);

        // Lấy danh sách tin nhắn cuối cùng với từng người
        List<LastMessageDTO> result = messageService.getLatestMessagesOfUser(currentUser.getUserId());

        // Chuẩn hóa response
        ApiResponse<List<LastMessageDTO>> response = new ApiResponse<>(
                200,
                "Lấy tin nhắn cuối cùng với từng người thành công",
                result
        );

        return ResponseEntity.ok(response);
    }



}
