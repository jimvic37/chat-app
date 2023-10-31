package com.jump.backend.service;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.jump.backend.model.User;


public class MyUserDetails implements UserDetails{
	
	private static final long serialVersionUID = 1L;
	private Integer id;
	private String username;
	private String password;
	private String profile;
	
	public MyUserDetails(User user) {
		
		this.username = user.getUsername();
		this.password = user.getPassword();
		this.id = user.getId();
		this.profile = user.getProfile();
	}
	
	public Integer getId() {
		return id;
	}

	@Override
	public String getPassword() {
		return password;
	}

	@Override
	public String getUsername() {
		return username;
	}

	public String getProfile() {
		return profile;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return null;
	}

}
