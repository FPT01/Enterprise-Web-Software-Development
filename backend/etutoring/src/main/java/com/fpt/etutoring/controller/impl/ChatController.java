package com.fpt.etutoring.controller.impl;

import com.fpt.etutoring.util.Constant;
import com.fpt.etutoring.websocket.ChatMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

@Controller
@CrossOrigin
public class ChatController {
    /**
     * Public chat.
     */
    @MessageMapping(Constant.PATH_SEND_MSG)
    @SendTo(Constant.PATH_TOPIC_PUBLIC)
    public ChatMessage sendMessage(@Payload ChatMessage chatMessage) {
        return chatMessage;
    }

    @MessageMapping(Constant.PATH_ADD_USER)
    @SendTo(Constant.PATH_TOPIC_PUBLIC)
    public ChatMessage addUser(@Payload ChatMessage chatMessage,
                               SimpMessageHeaderAccessor headerAccessor) {
        // Add user in web socket session
        headerAccessor.getSessionAttributes().put("username", chatMessage.getSender());
        return chatMessage;
    }


    /**
     * Private chat.
     */
    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping(Constant.PATH_SEND_PRIVATE_MSG)
    public void sendPrivateMessage(@Payload ChatMessage chatMessage) {
        simpMessagingTemplate.convertAndSendToUser(
                chatMessage.getReceiver().trim(), Constant.PATH_REPLY, chatMessage);
    }

    @MessageMapping(Constant.PATH_ADD_PRIVATE_USER)
    @SendTo(Constant.PATH_QUEUE_REPLY)
    public ChatMessage addPrivateUser(@Payload ChatMessage chatMessage,
                                      SimpMessageHeaderAccessor headerAccessor) {
        // Add user in web socket session
        headerAccessor.getSessionAttributes().put("private-username", chatMessage.getSender());
        return chatMessage;
    }
}
