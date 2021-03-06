package com.fpt.etutoring.controller.impl;

import com.fpt.etutoring.entity.impl.User;
import com.fpt.etutoring.service.MessageService;
import com.fpt.etutoring.service.UserService;
import com.fpt.etutoring.util.Constant;
import com.fpt.etutoring.websocket.ChatMessage;
import com.fpt.etutoring.websocket.OutputMessage;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.text.SimpleDateFormat;
import java.util.Date;

@Controller
@CrossOrigin(value = "*")
public class ChatController {
    @Autowired
    private UserService userService;
    @Autowired
    private MessageService messageService;

    private final SimpMessagingTemplate simpMessagingTemplate;

    private final SimpleDateFormat dateFormat = new SimpleDateFormat("dd-M-yyyy hh:mm:ss");

    public ChatController(SimpMessagingTemplate simpMessagingTemplate) {
        this.simpMessagingTemplate = simpMessagingTemplate;
    }

    @MessageMapping(Constant.CHAT_GREETINGS)
    public void send(String message) throws Exception {
        JsonObject convertedObject = new Gson().fromJson(message, JsonObject.class);
        User user = userService.findByUsername(convertedObject.get("username").getAsString());
        Date date = new Date();
        final String time = dateFormat.format(date);

        com.fpt.etutoring.entity.impl.Message msg = new com.fpt.etutoring.entity.impl.Message();
//        msg.setUser(user);
        msg.setContent(convertedObject.get("text").getAsString());
        msg.setTime(date);
        messageService.createOrUpdate(msg);
        OutputMessage output = new OutputMessage(convertedObject.get("username").getAsString(),
                convertedObject.get("text").getAsString(), time);
        this.simpMessagingTemplate.convertAndSend(Constant.CHAT_TOPIC_GREETINGS, output);
    }

    @MessageMapping("/sendPrivateMessage")
    public void sendPrivateMessage(@Payload ChatMessage chatMessage) {
        User sender = userService.findByUsername(chatMessage.getSender());
        User receiver = userService.findByUsername(chatMessage.getReceiver());

        com.fpt.etutoring.entity.impl.Message msg = new com.fpt.etutoring.entity.impl.Message();
        msg.setContent(chatMessage.getContent());
        msg.setTime(new Date());
        msg.setReceiver(receiver);
        msg.setSender(sender);
        messageService.createOrUpdate(msg);
        simpMessagingTemplate.convertAndSendToUser(
                chatMessage.getReceiver().trim(), "/reply", chatMessage);
    }

    @MessageMapping("/addPrivateUser")
    @SendTo("/queue/reply")
    public ChatMessage addPrivateUser(@Payload ChatMessage chatMessage,
                                      SimpMessageHeaderAccessor headerAccessor) {
        headerAccessor.getSessionAttributes().put("private-username", chatMessage.getSender());
        return chatMessage;
    }
}
