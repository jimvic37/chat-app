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
}
