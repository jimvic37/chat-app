package com.jump.backend.controller;

import com.jump.backend.dto.TypingMessage;
import com.jump.backend.model.Message;
import com.jump.backend.service.WSService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class WSController {

	@Autowired
	private WSService service;

	@MessageMapping("/typing-messages/{id}")
	public TypingMessage recMessage(@Payload TypingMessage message) {
		service.notifyGroupChatTyping(message.getChatId(), message);
		System.out.println("------------ THIS IS A TEST SERVER LOG MESSAGE -------------");
		return message;
	}
//    @MessageMapping("/private-message")
//    public Message recMessage(@Payload Message message){
//    	simpMessagingTemplate.convertAndSend(message.getReceiverName(),"/private",message);
//    	System.out.println(message.toString());
//    	return message;
//    }

// WE DON'T NEED THIS FILE BECAUSE WE ALREADY HAVE A SEND MESSAGE POST ROUTE IN THE MESSAGE CONTROLLER 
// ADD THE CODE TO SEND THE POSTED MESSAGE THROUGH THE SOCKET CONNECTION AT THE END OF THE MESSAGE POST ROUTE   
// KEEP FOR REFERENCE 

//    @PostMapping("/send-message")
//    public void sendMessage(@RequestBody final Message message) {
//        service.notifyFrontend(message.getContent());
//    }

//    @PostMapping("/send-message/{id}")
//    public void sendPrivateMessage(@PathVariable final String id,
//                                   @RequestBody final Message message) {
//        service.notifyGroupChat(id, message.getContent());
//    }
}
