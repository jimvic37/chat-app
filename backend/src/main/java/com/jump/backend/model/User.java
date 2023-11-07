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
	@JsonIgnore
	private String password;

//	@Column(columnDefinition = "varchar(255) default 'https://static.thenounproject.com/png/4530368-200.png'")
	private String profile;

	@JsonProperty(access = Access.WRITE_ONLY)
	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
	private List<UserChat> userChat;

//	@JsonIgnore
//	@OneToOne(mappedBy ="user", cascade = CascadeType.ALL)
//	private Message message;

	public User() {
	}

	public User(Integer id, @NotBlank String username, @NotBlank String password, String profile,
			List<UserChat> userChat) {
		super();
		this.id = id;
		this.username = username;
		this.password = password;
		this.profile = profile;
		this.userChat = userChat;
//		this.message = message;
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

	public String getProfile() {
		return profile;
	}

	public void setProfile(String profile) {
		this.profile = profile;
	}

	public List<UserChat> getUserChat() {
		return userChat;
	}

	public void setUserChat(List<UserChat> userChat) {
		this.userChat = userChat;
	}

//	public Message getMessage() {
//		return message;
//	}
//
//	public void setMessage(Message message) {
//		this.message = message;
//	}

	@Override
	public String toString() {
		return "User [id=" + id + ", username=" + username + ", password=" + password + ", profile=" + profile
				+ ", userChat=" + userChat + "]";
	}

}
