package com.jump.backend.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import com.jump.backend.dto.ResponseMessage;
import com.jump.backend.dto.TypingMessage;

@Service
public class WSService {

    private final SimpMessagingTemplate messagingTemplate;
    private final NotificationService notificationService;

    @Autowired
    public WSService(SimpMessagingTemplate messagingTemplate, NotificationService notificationService) {
        this.messagingTemplate = messagingTemplate;
        this.notificationService = notificationService;
    }
    public void notifyGroupChat(final String id, final String message) {
    	ResponseMessage response = new ResponseMessage(message);
    	
//    	notificationService.sendPrivateNotification(id);

    	messagingTemplate.convertAndSend("/topic/messages/" + id, response);
    } 
    
    public void notifyGroupChatTyping(String to, TypingMessage message) {
    	System.out.println("------------ WE GOT TO THE notifyGroupChatTyping METHOD -------------");
    	messagingTemplate.convertAndSend("/topic/typing-messages/" + to, message);
    } 
    
    

// KEEP FOR REFERENCE 
    
//    public void notifyFrontend(final String message) {
//        ResponseMessage response = new ResponseMessage(message);
//        notificationService.sendGlobalNotification();
//        messagingTemplate.convertAndSend("/topic/messages", response);
//    }

//    public void notifyUser(final String id, final String message) {
//        ResponseMessage response = new ResponseMessage(message);
//
//        notificationService.sendPrivateNotification(id);
//        messagingTemplate.convertAndSendToUser(id, "/topic/private-messages", response);
//    }
}

