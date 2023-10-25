package com.jump.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.jump.backend.model.UserChat;

@Repository
public interface UserChatRepository extends JpaRepository<UserChat, Integer>{
	

}
