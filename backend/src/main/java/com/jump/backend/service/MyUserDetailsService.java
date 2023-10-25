package com.jump.backend.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.jump.backend.model.User;
import com.jump.backend.repository.UserRepository;


@Service
public class MyUserDetailsService implements UserDetailsService{
	
	@Autowired
	UserRepository repo;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Optional<User> userFound = repo.findByUsername(username);
		
		if(userFound.isEmpty()) {
			throw new UsernameNotFoundException("Username of " + username + " not found");
		}
		return new MyUserDetails( userFound.get() );
	}

}
