package com.fpt.etutoring.controller.impl;

import com.fpt.etutoring.service.MessageService;
import com.fpt.etutoring.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

@Controller
@CrossOrigin(value = "*")
public class ChatController {
    @Autowired
    private UserService userService;
    @Autowired
    private MessageService messageService;

    private final SimpMessagingTemplate simpMessagingTemplate;

    public ChatController(SimpMessagingTemplate simpMessagingTemplate) {
        this.simpMessagingTemplate = simpMessagingTemplate;
    }

    @MessageMapping("/greetings")
    public synchronized void send(String message) throws Exception {
//        User user = userService.findByUsername(message.getFrom());
//        if (user == null)
//            return new OutputMessage();
//
//        Date date = new Date();
//        final String time = new SimpleDateFormat("HH:mm").format(date);
//
//        com.fpt.etutoring.entity.impl.Message msg = new com.fpt.etutoring.entity.impl.Message();
//        msg.setUser(user);
//        msg.setContent(message.getText());
//        msg.setTime(date);
//        messageService.createOrUpdate(msg);
//        return new OutputMessage(message.getFrom(), message.getText(), time);
        String text = "Hi! " + message;
        this.simpMessagingTemplate.convertAndSend("/topic/greetings", text);
    }
}
