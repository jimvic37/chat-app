package com.jump.backend.model;


import java.io.Serializable;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.validation.constraints.NotBlank;

@Entity
public class User implements Serializable {
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@Column(unique = true, nullable = false)
	@NotBlank
	private String username;
	
	@Column(nullable = false)
	@NotBlank
	private String password;
	
//	@OneToOne(fetch = FetchType.LAZY, mappedBy = "user" )
//	@JsonIgnore
//	private Message message;
	
	@JsonProperty(access = Access.WRITE_ONLY)
	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
	private List<UserChat> user_chat;

	public User() {
	}

	public User(Integer id, @NotBlank String username, @NotBlank String password,
			List<UserChat> user_chat) {
		super();
		this.id = id;
		this.username = username;
		this.password = password;
//		this.message = message;
		this.user_chat = user_chat;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

//	public Message getMessage() {
//		return message;
//	}
//
//	public void setMessage(Message message) {
//		this.message = message;
//	}

	public List<UserChat> getUser_chat() {
		return user_chat;
	}

	public void setUser_chat(List<UserChat> user_chat) {
		this.user_chat = user_chat;
	}

	@Override
	public String toString() {
		return "User [id=" + id + ", username=" + username + ", password=" + password
				+ ", user_chat=" + user_chat + "]";
	}
	
}
