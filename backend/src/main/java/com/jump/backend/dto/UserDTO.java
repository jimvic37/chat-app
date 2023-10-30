package com.jump.backend.dto;

public class UserDTO {
	
	private Integer id;
	private String profile;
	private String username;
	
	public UserDTO(Integer integer, String username, String profile) {
		super();
		this.id = integer;
		this.username = username;
		this.profile = profile;
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
	public String getProfile() {
		return profile;
	}
	public void setProfile(String profile) {
		this.profile = profile;
	}
}
