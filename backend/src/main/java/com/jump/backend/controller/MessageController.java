package com.jump.backend.controller;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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
    	LocalDateTime localDateTime  = LocalDateTime.now();
        ZonedDateTime zonedDateTime = localDateTime.atZone(ZoneId.systemDefault());
        ZoneId timeZone = zonedDateTime.getZone();
        
		message.setId(null);
		message.setContent(message.getContent());
		message.setCreated(localDateTime);
		message.setTimeZone(timeZone);
		message.setUser(null);
		message.setChat(null);
		
		Message created = repo.save(message);
		return ResponseEntity.status(201).body(created);
	}
	
	//Edit message
	@PutMapping("/message/{messageId}")
	public ResponseEntity<?> editMessage(@RequestBody Message updatedMessage, @PathVariable int messageId) {
		
		LocalDateTime localDateTime  = LocalDateTime.now();
        ZonedDateTime zonedDateTime = localDateTime.atZone(ZoneId.systemDefault());
        ZoneId timeZone = zonedDateTime.getZone();
        
	    Optional<Message> existingMessageOptional = repo.findById(messageId);
	    
	    if (existingMessageOptional.isPresent()) {
	        Message existingMessage = existingMessageOptional.get();
	        existingMessage.setContent(updatedMessage.getContent());
	        existingMessage.setCreated(localDateTime);
	        existingMessage.setTimeZone(timeZone);

	        Message updated = repo.save(existingMessage);
	        
	        return ResponseEntity.status(201).body(updated);
	    } else {
	        return ResponseEntity.status(404).body("Message not found");
	    }
	}
	//Delete message
	@DeleteMapping("/message/{messageId}")
	public ResponseEntity<?> deleteMessage(@PathVariable int messageId) {
	    if (repo.existsById(messageId)) {
	        repo.deleteById(messageId);
	        return ResponseEntity.status(200).body("Message deleted successfully.");
	    } else {
	        return ResponseEntity.status(404).body("Message not found.");
	    }
	}

	
	//View message in a chat
	@GetMapping("/message/chat/{chatId}")
	public ResponseEntity<?> viewMessagesInChat(@PathVariable int chatId) {
	    List<Message> messages = repo.findByChatId(chatId);
	    if (!messages.isEmpty()) {
	        return ResponseEntity.status(200).body(messages);
	    } else {
	        return ResponseEntity.status(404).body("No messages found in the chat.");
	    }
	}
	
	

}
