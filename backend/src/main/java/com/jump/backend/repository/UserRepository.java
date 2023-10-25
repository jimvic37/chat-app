package com.jump.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.jump.backend.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

}
