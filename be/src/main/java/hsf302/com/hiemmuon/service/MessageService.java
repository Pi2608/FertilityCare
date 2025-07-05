package hsf302.com.hiemmuon.service;

import hsf302.com.hiemmuon.dto.responseDto.LastMessageDTO;
import hsf302.com.hiemmuon.dto.responseDto.MessageViewDTO;
import hsf302.com.hiemmuon.entity.Message;
import hsf302.com.hiemmuon.entity.User;
import hsf302.com.hiemmuon.repository.MessageRepository;
import hsf302.com.hiemmuon.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MessageService {
    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private UserRepository userRepository;

    public MessageViewDTO sendMessage(int senderId, int receiverId, String content) {
        // 🔥 Fetch từ DB để đảm bảo User tồn tại và được quản lý bởi JPA
        User sender = userRepository.findById(senderId)
                .orElseThrow(() -> new RuntimeException("Sender not found"));
        User receiver = userRepository.findById(receiverId)
                .orElseThrow(() -> new RuntimeException("Receiver not found"));

        Message message = new Message();
        message.setSender(sender);
        message.setReceiver(receiver);
        message.setContent(content);
        message.setTimestamp(LocalDateTime.now());
        message.setRead(false);

        Message saved = messageRepository.save(message);
        return convertToDTO(saved);
    }


    public List<MessageViewDTO> getConversation(int user1, int user2) {
        List<Message> messages = messageRepository.findChatMessages(user1, user2);
        return messages.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    private MessageViewDTO convertToDTO(Message m) {
        return new MessageViewDTO(
                m.getMessageId(),
                m.getSender().getUserId(),
                m.getSender().getName(),
                m.getReceiver().getUserId(),
                m.getReceiver().getName(),
                m.getContent(),
                m.getTimestamp()
        );
    }

    public List<LastMessageDTO> getLatestMessagesOfUser(int userId) {
        List<Message> messages = messageRepository.findLatestMessagesWithEachUser(userId);
        return messages.stream().map(m -> {
            User other = (m.getSender().getUserId() == userId) ? m.getReceiver() : m.getSender();
            return new LastMessageDTO(
                    other.getUserId(),
                    other.getName(),
                    m.getContent(),
                    m.getTimestamp()
            );
        }).collect(Collectors.toList());
    }


}
