package com.jump.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

	@Override
	public void registerStompEndpoints(final StompEndpointRegistry registry) {
		registry.addEndpoint("/chat").setHandshakeHandler(new UserHandshakeHandler())
				.setAllowedOrigins("http://localhost:3000").withSockJS();
	}

	@Override
	public void configureMessageBroker(final MessageBrokerRegistry registry) {
		registry.enableSimpleBroker("/topic"); // we need to subscribe to the same endpoints in the frontend 
		registry.setApplicationDestinationPrefixes("/ws");
	}
	

}



