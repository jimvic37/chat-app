package com.jump.backend.dto;

import java.time.LocalDateTime;
import java.time.ZoneId;

import com.jump.backend.model.Message;

public class CustomMessageResponse {
	private Integer id;
	private String content;
	private LocalDateTime created;
	private ZoneId timeZone;
	private UserDTO userDTO;

	public CustomMessageResponse(Message message) {
		this.id = message.getId();
		this.content = message.getContent();
		this.created = message.getCreated();
		this.timeZone = message.getTimeZone();
		this.userDTO = message.getUserDTO();
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

	public void setCreated(LocalDateTime created) {
		this.created = created;
	}

	public ZoneId getTimeZone() {
		return timeZone;
	}

	public void setTimeZone(ZoneId timeZone) {
		this.timeZone = timeZone;
	}

	public UserDTO getUserDTO() {
		return userDTO;
	}

	public void setUserDTO(UserDTO userDTO) {
		this.userDTO = userDTO;
	}

}
