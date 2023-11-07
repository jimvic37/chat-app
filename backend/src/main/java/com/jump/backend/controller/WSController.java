package com.jump.backend.controller;
import com.jump.backend.model.Message;
import com.jump.backend.service.WSService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class WSController {

    @Autowired
    private WSService service;
    
    
// WE DON'T NEED THIS FILE BECAUSE WE ALREADY HAVE A SEND MESSAGE POST ROUTE IN THE MESSAGE CONTROLLER 
// ADD THE CODE TO SEND THE POSTED MESSAGE THROUGH THE SOCKET CONNECTION AT THE END OF THE MESSAGE POST ROUTE   
// KEEP FOR REFERENCE 
 
//    @PostMapping("/send-message")
//    public void sendMessage(@RequestBody final Message message) {
//        service.notifyFrontend(message.getContent());
//    }

//    @PostMapping("/send-message/{id}")
//    public void sendPrivateMessage(@PathVariable final String id,
//                                   @RequestBody final Message message) {
//        service.notifyGroupChat(id, message.getContent());
//    }
}
