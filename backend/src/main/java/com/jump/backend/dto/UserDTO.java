package com.jump.backend.dto;

public class UserDTO {
	
	private Integer id;
	public UserDTO(Integer integer, String username) {
		super();
		this.id = integer;
		this.username = username;
	}
	private String username;
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
}
