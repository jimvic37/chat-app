package com.jump.backend.model;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotBlank;

@Entity
public class Chat implements Serializable{
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@Column(unique = true, nullable = false)
	@NotBlank
	private String chatName;
	
	
	@OneToMany(mappedBy = "chat", cascade = CascadeType.ALL)
	private List<Message> messages;
	
	@JsonProperty(access = Access.WRITE_ONLY)
	@OneToMany(mappedBy = "chat", cascade = CascadeType.ALL)
	private List<UserChat> userChat;

	public Chat() {
	}

	public Chat(Integer id, @NotBlank String chatName, List<Message> messages, List<UserChat> userChat) {
		super();
		this.id = id;
		this.chatName = chatName;
		this.messages = messages;
		this.userChat = userChat;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getChatName() {
		return chatName;
	}

	public void setChatName(String chatName) {
		this.chatName = chatName;
	}

	public List<Message> getMessages() {
		return messages;
	}

	public void setMessages(List<Message> messages) {
		this.messages = messages;
	}

	public List<UserChat> getUserChat() {
		return userChat;
	}

	public void setUserChat(List<UserChat> userChat) {
		this.userChat = userChat;
	}

	@Override
	public String toString() {
		return "Chat [id=" + id + ", chatName=" + chatName + ", messages=" + messages + ", userChat=" + userChat + "]";
	}

	

}
