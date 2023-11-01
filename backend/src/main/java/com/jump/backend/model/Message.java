package com.jump.backend.model;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.jump.backend.dto.UserDTO;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Transient;
import jakarta.validation.constraints.NotBlank;

@Entity
public class Message implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(nullable = false)
	@NotBlank
	private String content;

	@Column(nullable = false)
	@JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
	private LocalDateTime created;

	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "user_id", referencedColumnName = "id")
	private User user;

	@ManyToOne
	@JoinColumn(name = "chat_id", referencedColumnName = "id")
	private Chat chat;
	
	
	// Add a UserDTO field with appropriate getters and setters
	@JsonInclude(JsonInclude.Include.NON_NULL)
	@Transient
	private UserDTO userDTO;

	public Message() {
	}

	public Message(Integer id, @NotBlank String content, LocalDateTime created, User user, Chat chat) {
		super();
		this.id = id;
		this.content = content;
		this.created = created;
		this.user = user;
		this.chat = chat;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public LocalDateTime getCreated() {
		return created;
	}

	public void setCreated(LocalDateTime localDateTime) {
		this.created = localDateTime;
	}

	public UserDTO getUserDTO() {
		return userDTO;
	}

	public void setUserDTO(UserDTO userDTO) {
		this.userDTO = userDTO;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

//	public Chat getChat() {
//		return chat;
//	}

	public void setChat(Chat chat) {
		this.chat = chat;
	}

	@Override
	public String toString() {
		return "Message [id=" + id + ", content=" + content + ", created=" + created + ", user=" + user + ", chat="
				+ chat + ", userDTO=" + userDTO + "]";
	}

}
