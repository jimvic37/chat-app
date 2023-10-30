package com.jump.backend.dto;

import com.jump.backend.model.Chat;
import com.jump.backend.model.Message;

public class ChatWithMessageDTO {
	
	private Chat chat;
    private Message mostRecentMessage;
    
    public ChatWithMessageDTO() {}
    
    public ChatWithMessageDTO(Chat chat, Message mostRecentMessage) {
        this.chat = chat;
        this.mostRecentMessage = mostRecentMessage;
    }
	
	public Chat getChat() {
		return chat;
	}
	public void setChat(Chat chat) {
		this.chat = chat;
	}

	public Message getMostRecentMessage() {
		return mostRecentMessage;
	}

	public void setMostRecentMessage(Message mostRecentMessage) {
		this.mostRecentMessage = mostRecentMessage;
	}

	
}
