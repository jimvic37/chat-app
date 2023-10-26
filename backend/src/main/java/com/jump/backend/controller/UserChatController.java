package com.jump.backend.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jump.backend.repository.UserChatRepository;
import com.jump.backend.repository.UserRepository;
import com.jump.backend.model.Chat;
import com.jump.backend.model.User;
import com.jump.backend.repository.ChatRepository;
import com.jump.backend.model.UserChat;

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
		Optional<Chat> chatFound = chatRepo.findById(chatId);
        Optional<User> userFound = userRepo.findById(userId);

        if (chatFound.isPresent() && userFound.isPresent()) {
            // Check if the user is already a member of the chat
            boolean isMember = userChatRepo.existsByUserAndChat(userFound.get(), chatFound.get());
            if (!isMember) {
                // Create a new UserChat entry to add the user to the chat
                UserChat userChat = new UserChat();
                userChat.setUser(userFound.get());
                userChat.setChat(chatFound.get());
                userChat.setLeftChat(false);
                userChatRepo.save(userChat);
                return ResponseEntity.status(201).body("User added to the chat.");
            } else {
                return ResponseEntity.status(400).body("User is already a member of the chat.");
            }
        } else {
            return ResponseEntity.status(404).body("Chat or User not found.");
        }
    }
	
	//leave chat
    @PutMapping("/userChat/leave/{chatId}/{userId}")
	public ResponseEntity<?> leaveChat(@PathVariable int chatId, @PathVariable int userId) {
		Optional<Chat> chatFound = chatRepo.findById(chatId);
        Optional<User> userFound = userRepo.findById(userId);

        if (chatFound.isPresent() && userFound.isPresent()) {
            // Find the UserChat entry for the user in the chat
            Optional<UserChat> userChat = userChatRepo.findByUserAndChat(userFound.get(), chatFound.get());
            if (userChat.isPresent()) {
                // Set leftChat to true to indicate the user has left the chat
                userChat.get().setLeftChat(true);
                userChatRepo.save(userChat.get());
                return ResponseEntity.status(200).body("User left the chat.");
            } else {
                return ResponseEntity.status(400).body("User is not a member of the chat.");
            }
        } else {
            return ResponseEntity.status(404).body("Chat or User not found.");
        }
    }

}
