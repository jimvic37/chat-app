package com.jump.backend.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jump.backend.repository.UserChatRepository;
import com.jump.backend.repository.UserRepository;
import com.jump.backend.repository.ChatRepository;


@RestController
@RequestMapping("/api")
public class UserChatController {
	
	@Autowired
	UserChatRepository userChatRepo;
	
	@Autowired
	UserRepository userRepo;
	
	@Autowired
	ChatRepository chatRepo;
	
	//add member to chat
	@PostMapping("/userChat/join/{chatId}/{userId}")
	public ResponseEntity<?> addMemberToChat(@PathVariable int chatId, @PathVariable int userId) {
		Optional<Chat> = chatRepo.findById(chatId);
		Optional<User> = 
		return null;
	}
	
	
}
