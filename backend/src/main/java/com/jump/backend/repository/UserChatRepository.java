package com.jump.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.jump.backend.model.Chat;
import com.jump.backend.model.User;
import com.jump.backend.model.UserChat;

@Repository
public interface UserChatRepository extends JpaRepository<UserChat, Integer>{
	boolean existsByUserAndChat(User user, Chat chat);
    Optional<UserChat> findByUserAndChat(User user, Chat chat);

}
