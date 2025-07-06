package hsf302.com.hiemmuon.repository;

import hsf302.com.hiemmuon.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface MessageRepository extends JpaRepository<Message, Integer> {
    // Lấy tin nhắn giữa hai người dùng
    @Query("SELECT m FROM Message m WHERE " +
            "(m.sender.userId = :user1 AND m.receiver.userId = :user2) OR " +
            "(m.sender.userId = :user2 AND m.receiver.userId = :user1) " +
            "ORDER BY m.timestamp ASC")
    List<Message> findChatMessages(@Param("user1") int user1, @Param("user2") int user2);

    @Query(value = """
    SELECT m.*
    FROM messages m
    JOIN (
        SELECT other_user_id, MAX(timestamp) as max_time
        FROM (
            SELECT 
                CASE 
                    WHEN sender_id = ?1 THEN receiver_id 
                    ELSE sender_id 
                END as other_user_id,
                timestamp
            FROM messages
            WHERE sender_id = ?1 OR receiver_id = ?1
        ) as sub
        GROUP BY other_user_id
    ) latest ON (
        (m.sender_id = ?1 AND m.receiver_id = latest.other_user_id OR
         m.sender_id = latest.other_user_id AND m.receiver_id = ?1)
        AND m.timestamp = latest.max_time
    )
    ORDER BY m.timestamp DESC
""", nativeQuery = true)
    List<Message> findLatestMessagesWithEachUser(@Param("userId") int userId);




}
