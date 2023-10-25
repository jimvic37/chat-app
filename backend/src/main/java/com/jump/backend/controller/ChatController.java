package com.jump.backend.controller;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jump.backend.repository.ChatRepository;
import com.jump.backend.model.Chat;

@RestController
@RequestMapping("/api")
public class ChatController {
	
	@Autowired
	ChatRepository repo;
	
	//Create chat
	@PostMapping("/chat")
	public ResponseEntity<?> createChat(@RequestBody Chat chat) {
	    LocalDateTime currentDateTime = LocalDateTime.now();
	    chat.setId(null);
	    chat.setChat_name(chat.getChat_name());
	    chat.setCreated(currentDateTime);
	    chat.setMessages(null);
	    chat.setUser_chat(null);
		Chat created = repo.save(chat);
		return ResponseEntity.status(201).body(created);
		
	}
	

	
	//leave chat
	@PutMapping("/chat/leave/chat_id")
	public ResponseEntity<?> leaveChat() {
		return null;
	}
	
}


//@Controller
//public class ChatController {
//	
//	
//	@MessageMapping("/chat.sendMessage")
//	// To which queue you want to send it to
//	@SendTo("/topic/public")
//	 // will be automatically be sent to /topic/public
//	public ChatMessage sendMessage(@Payload ChatMessage chatMessage) {
//		return chatMessage;
//		
//	}
//	@MessageMapping("/chat.addUser")
//	@SendTo("/topic/public")
//	public ChatMessage addUser(@Payload ChatMessage chatMessage, SimpMessageHeaderAccessor headerAccessor) {
//		//Add username in web socket session
//		headerAccessor.getSessionAttributes().put("username", chatMessage.getSender());
//		return chatMessage;
//	}
//
//}


//package com.jump.backend.controller;
