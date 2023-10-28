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
	private String chat_name;
	
	@Column(unique = true, nullable = false)
	private LocalDateTime created;
	
	@Column(nullable = false)
	private ZoneId timeZone;
	
	@OneToMany(mappedBy = "chat", cascade = CascadeType.ALL)
	private List<Message> messages;
	
	@JsonProperty(access = Access.WRITE_ONLY)
	@OneToMany(mappedBy = "chat", cascade = CascadeType.ALL)
	private List<UserChat> user_chat;

	public Chat() {
	}

	public Chat(Integer id, @NotBlank String chat_name, LocalDateTime created, ZoneId timeZone, List<Message> messages,
			List<UserChat> user_chat) {
		super();
		this.id = id;
		this.chat_name = chat_name;
		this.created = created;
		this.timeZone = timeZone;
		this.messages = messages;
		this.user_chat = user_chat;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getChat_name() {
		return chat_name;
	}

	public void setChat_name(String chat_name) {
		this.chat_name = chat_name;
	}

	public LocalDateTime getCreated() {
		return created;
	}

	public void setCreated(LocalDateTime created) {
		this.created = created;
	}

	public List<Message> getMessages() {
		return messages;
	}

	public void setMessages(List<Message> messages) {
		this.messages = messages;
	}

	public List<UserChat> getUser_chat() {
		return user_chat;
	}

	public void setUser_chat(List<UserChat> user_chat) {
		this.user_chat = user_chat;
	}

	public ZoneId getTimeZone() {
		return timeZone;
	}

	public void setTimeZone(ZoneId timeZone) {
		this.timeZone = timeZone;
	}

	@Override
	public String toString() {
		return "Chat [id=" + id + ", chat_name=" + chat_name + ", created=" + created + ", timeZone=" + timeZone
				+ ", messages=" + messages + ", user_chat=" + user_chat + "]";
	}

}
