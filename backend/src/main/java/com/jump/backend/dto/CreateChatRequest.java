package com.jump.backend.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.jump.backend.model.Chat;

public class CreateChatRequest {
	private Chat chat;
	private List<Integer> userIds;

	@JsonCreator
	public CreateChatRequest(@JsonProperty("chat") Chat chat, @JsonProperty("userIds") List<Integer> userIds) {
		super();
		this.chat = chat;
		this.userIds = userIds;
	}

	public Chat getChat() {
		return chat;
	}

	public void setChat(Chat chat) {
		this.chat = chat;
	}

	public List<Integer> getUserIds() {
		return userIds;
	}

	public void setUserIds(List<Integer> userIds) {
		this.userIds = userIds;
	}

}
