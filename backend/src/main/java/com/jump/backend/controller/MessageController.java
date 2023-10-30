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

import com.jump.backend.dto.CustomMessageResponse;
import com.jump.backend.dto.UserDTO;
import com.jump.backend.model.Chat;
import com.jump.backend.model.Message;
import com.jump.backend.model.User;
import com.jump.backend.repository.ChatRepository;
import com.jump.backend.repository.MessageRepository;
import com.jump.backend.repository.UserRepository;

@RestController
@RequestMapping("/api")
public class MessageController {

	@Autowired
	MessageRepository repo;

	@Autowired
	ChatRepository chatRepo;

	@Autowired
	UserRepository userRepo;

	// Create message
	@PostMapping("/chat/{chatId}/user/{user_id}/message")
	public ResponseEntity<?> createMessage(@RequestBody Message message, @PathVariable Integer chatId,
			@PathVariable Integer user_id) {
		LocalDateTime localDateTime = LocalDateTime.now();
		ZonedDateTime zonedDateTime = localDateTime.atZone(ZoneId.systemDefault());
		ZoneId timeZone = zonedDateTime.getZone();

		// Check if the chatId and user_id are valid and retrieve the chat and user
		Chat chat = chatRepo.findById(chatId).orElse(null);
		User user = userRepo.findById(user_id).orElse(null);

		if (chat == null || user == null) {
			// Handle the case where the chat or user does not exist
			return ResponseEntity.status(400).body("Chat or User not found");
		}

		message.setContent(message.getContent());
		message.setCreated(localDateTime);
		message.setTimeZone(timeZone);

		// Associate the chat and user with the message
		message.setChat(chat);
		message.setUser(user);

		Message created = repo.save(message);

		// Create a UserDTO with the desired user information
		UserDTO userDTO = new UserDTO(user.getId(), user.getUsername(), user.getProfile());

		// Modify the 'created' message to include the simplified user information
		created.setUserDTO(userDTO);

		  // Create a custom response object with the message and userDTO
	    CustomMessageResponse response = new CustomMessageResponse(created);

	    return ResponseEntity.status(201).body(response);
	}

	// Edit message
	@PutMapping("/message/{messageId}")
	public ResponseEntity<?> editMessage(@RequestBody Message updatedMessage, @PathVariable int messageId) {

		LocalDateTime localDateTime = LocalDateTime.now();
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

	// Delete message
	@DeleteMapping("/message/{messageId}")
	public ResponseEntity<?> deleteMessage(@PathVariable int messageId) {
		if (repo.existsById(messageId)) {
			repo.deleteById(messageId);
			return ResponseEntity.status(200).body("Message deleted successfully.");
		} else {
			return ResponseEntity.status(404).body("Message not found.");
		}
	}

	// View message in a chat
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
