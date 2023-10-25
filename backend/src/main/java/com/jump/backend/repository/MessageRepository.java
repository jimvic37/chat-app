package com.jump.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.jump.backend.model.Message;

@Repository
public interface MessageRepository extends JpaRepository<Message, Integer>{
	
	

}