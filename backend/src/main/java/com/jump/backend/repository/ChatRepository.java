package com.jump.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.jump.backend.model.Chat;

@Repository
public interface ChatRepository extends JpaRepository<Chat, Integer> {
	
    @Query("SELECT c FROM Chat c JOIN c.userChat uc WHERE uc.user.id = :userId")
    List<Chat> findChatsByUserId(@Param("userId") int userId);
	
//	@Query("SELECT new com.jump.backend.dto.ChatWithMessageDTO(c, (SELECT m FROM Message m WHERE m.chat = c ORDER BY m.created DESC)) FROM Chat c JOIN c.userChat uc WHERE uc.user.id = :userId")
//	List<ChatWithMessageDTO> findChatsWithMostRecentMessageByUserId(@Param("userId") Integer userId);
    @Query("SELECT c, m " +
    	       "FROM Chat c " +
    	       "JOIN c.userChat uc " +
    	       "JOIN uc.user u " +
    	       "LEFT JOIN Message m " +
    	       "ON c.id = m.chat.id " +
    	       "AND m.created = (SELECT MAX(m2.created) FROM Message m2 WHERE m2.chat.id = c.id) " +
    	       "WHERE u.id = :userId")
     List<Object[]> findChatsWithMostRecentMessageByUserId(@Param("userId") Integer userId);

}
