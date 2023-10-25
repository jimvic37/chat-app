package com.jump.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jump.backend.model.User;
import com.jump.backend.repository.UserRepository;


@RestController
@RequestMapping("/api")
public class UserController {

	@Autowired
	UserRepository repo;

	@Autowired
	PasswordEncoder encoder;

	@PostMapping("/signup")
	public ResponseEntity<?> createUser(@RequestBody User user) {

		user.setId(null);

		user.setPassword(encoder.encode(user.getPassword()));

		User created = repo.save(user);

		return ResponseEntity.status(201).body(created);
	}

}
