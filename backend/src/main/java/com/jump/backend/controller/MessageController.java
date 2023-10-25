package com.jump.backend.controller;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jump.backend.model.Message;
import com.jump.backend.repository.MessageRepository;

@RestController
@RequestMapping("/api")
public class MessageController {
	
	@Autowired
	MessageRepository repo;
	
//	Create message
	@PostMapping("/message")
	public ResponseEntity<?> createMessage(@RequestBody Message message) {
	    LocalDateTime currentDateTime = LocalDateTime.now();
		message.setId(null);
		message.setContent(message.getContent());
		message.setCreated(currentDateTime);
		message.setUser(null);
		message.setChat(null);
		
		Message created = repo.save(message);
		return ResponseEntity.status(201).body(created);
	}

}
