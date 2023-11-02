package com.jump.backend.config;
import com.sun.security.auth.UserPrincipal;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.support.DefaultHandshakeHandler;
import java.security.Principal;
import java.util.Map;
import java.util.UUID;

public class UserHandshakeHandler extends DefaultHandshakeHandler {
    private final Logger LOG = LoggerFactory.getLogger(UserHandshakeHandler.class);

    @Override
    protected Principal determineUser(ServerHttpRequest request, WebSocketHandler wsHandler, Map<String, Object> attributes) {
        final String randomId = UUID.randomUUID().toString();
        
    	// Get the user ID from the request object and return that, instead of returning this random ID 
        // It will associate this socket connection with the currentUser so we can send INDIVIDUAL notifications in the future  
        // We can use the request headers to include the chatID when making the initial request for a socket connection  
        
        LOG.info("User with ID '{}' opened the page", "123123123123");

        return new UserPrincipal(randomId);
    }
}
