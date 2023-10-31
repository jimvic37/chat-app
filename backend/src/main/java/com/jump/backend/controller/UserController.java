package com.jump.backend.controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jump.backend.dto.UserDTO;
import com.jump.backend.model.User;
import com.jump.backend.repository.UserRepository;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000/")
public class UserController {

	@Autowired
	UserRepository repo;

	@Autowired
	PasswordEncoder encoder;

	@PostMapping("/signup")
	public ResponseEntity<?> createUser(@RequestBody User user) {

		Optional<User> foundUser = repo.findByUsername(user.getUsername());
		if (foundUser.isEmpty()) {
			user.setId(null);

			user.setPassword(encoder.encode(user.getPassword()));
			
			String profile = user.getProfile();

			user.setProfile((profile != null) ? profile : "https://static.thenounproject.com/png/4530368-200.png");

			User created = repo.save(user);

			return ResponseEntity.status(201).body(created);
		} else {
			return ResponseEntity.status(403).body(Map.of("error", "Username is not available"));
		}
	}
	// return information of user by id
	@GetMapping("/user/{userId}")
	public ResponseEntity<?> getUserById(@PathVariable int userId) {
		Optional<User> foundUser = repo.findById(userId);
		if (foundUser.isEmpty()) {
			return ResponseEntity.notFound().build();
		}
		UserDTO user = new UserDTO(foundUser.get().getId(), foundUser.get().getUsername(), foundUser.get().getProfile());
		return ResponseEntity.status(200).body(user);
	}
	
	// returns only id and username for every user
	@GetMapping("/users")
	public List<UserDTO> getAllUsers() {
		List<UserDTO> userDTOs = repo.findAll().stream().map(user -> new UserDTO(user.getId(), user.getUsername(), user.getProfile()))
				.collect(Collectors.toList());

		return userDTOs;
	}

}
