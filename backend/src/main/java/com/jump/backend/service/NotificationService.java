package com.jump.backend.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import com.jump.backend.dto.ResponseMessage;

@Service
public class NotificationService {
    private final SimpMessagingTemplate messagingTemplate;

    @Autowired
    public NotificationService(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }
    
    public void sendToChatroom(String chatID, String messageContent) {
        ResponseMessage message = new ResponseMessage(messageContent);

        String destination = "/topic/chatrooms/" + chatID; // Modify the destination to target a specific chatroom
        messagingTemplate.convertAndSend(destination, message);
    }



// KEEP THESE COMMENTS FOR REFERENCE 
//    
    public void sendPrivateNotification(final String userId) {
        ResponseMessage message = new ResponseMessage("Private Notification");

        messagingTemplate.convertAndSendToUser(userId,"/topic/private-notifications", message);
    }
    
    public void sendGlobalNotification() {
        ResponseMessage message = new ResponseMessage("Global Notification");

        messagingTemplate.convertAndSend("/topic/global-notifications", message);
    }
}
