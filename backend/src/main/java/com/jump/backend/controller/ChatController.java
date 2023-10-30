package com.jump.backend.controller;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.jump.backend.repository.ChatRepository;
import com.jump.backend.repository.UserChatRepository;
import com.jump.backend.repository.UserRepository;
import com.jump.backend.dto.CreateChatRequest;
import com.jump.backend.model.Chat;
import com.jump.backend.model.User;
import com.jump.backend.model.UserChat;

@RestController
@RequestMapping("/api")
public class ChatController {

	@Autowired
	ChatRepository chatRepo;
	@Autowired
	UserRepository userRepo;
	@Autowired
	UserChatRepository userChatRepo;

	// Get chat for specific user
	@GetMapping("/chat/{userId}")
	public ResponseEntity<List<Chat>> getChatsByUser(@PathVariable int userId) {
		List<Chat> userChats = chatRepo.findChatsByUserId(userId);

		if (userChats.isEmpty()) {
			return ResponseEntity.notFound().build();
		}

		return ResponseEntity.ok(userChats);
	}

//	//Create chat
//	@PostMapping("/chat")
//	public ResponseEntity<?> createChat(@RequestBody Chat chat) {
//	    LocalDateTime localDateTime  = LocalDateTime.now();
//        ZonedDateTime zonedDateTime = localDateTime.atZone(ZoneId.systemDefault());
//        ZoneId timeZone = zonedDateTime.getZone();
//        
//	    chat.setId(null);
//	    chat.setChatName(chat.getChatName());
//	    chat.setCreated(localDateTime);
//	    chat.setTimeZone(timeZone);
//	    chat.setMessages(null);
//	    chat.setUserChat(null);
//		Chat created = repo.save(chat);
//		return ResponseEntity.status(201).body(created);
//		
//	}
	@PostMapping("/chat")
	public ResponseEntity<?> createChat(@RequestBody CreateChatRequest createChatRequest) {
		LocalDateTime localDateTime = LocalDateTime.now();
		ZonedDateTime zonedDateTime = localDateTime.atZone(ZoneId.systemDefault());
		ZoneId timeZone = zonedDateTime.getZone();

		Chat chat = createChatRequest.getChat();
		chat.setId(null);
		chat.setChatName(chat.getChatName());
		chat.setCreated(localDateTime);
		chat.setTimeZone(timeZone);

		// Save the chat to create it in the database
		Chat createdChat = chatRepo.save(chat);

		List<Integer> userIds = createChatRequest.getUserIds();

		// Associate users with the chat
		for (Integer userId : userIds) {
			// Load the User entity by ID (You may need to fetch it from the repository)
			User user = userRepo.findById(userId).orElse(null);

			if (user != null) {
				UserChat userChat = new UserChat();
				userChat.setUser(user);
				userChat.setChat(createdChat);

				// Save the UserChat entity to associate the user with the chat
				userChatRepo.save(userChat);
			}
		}

		return ResponseEntity.status(HttpStatus.CREATED).body(createdChat);
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
