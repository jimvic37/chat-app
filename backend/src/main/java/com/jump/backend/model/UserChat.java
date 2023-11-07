package com.jump.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class UserChat {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@ManyToOne
	@JoinColumn(name = "user_id", referencedColumnName = "id")
	private User user;
	
	@ManyToOne
	@JoinColumn(name = "chat_id", referencedColumnName = "id")
	private Chat chat;
	
    @Column(columnDefinition = "boolean default false")
	private boolean leftChat;

	public UserChat() {
	}

	public UserChat(Integer id, User user, Chat chat, boolean leftChat) {
		super();
		this.id = id;
		this.user = user;
		this.chat = chat;
		this.leftChat = leftChat;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Chat getChat() {
		return chat;
	}

	public void setChat(Chat chat) {
		this.chat = chat;
	}
	
	public boolean getLeftChat() {
		return leftChat;
	}

	public void setLeftChat(boolean leftChat) {
		this.leftChat = leftChat;
	}

	@Override
	public String toString() {
		return "UserChat [id=" + id + ", user=" + user + ", chat=" + chat + ", leftChat=" + leftChat + "]";
	}

	
}
