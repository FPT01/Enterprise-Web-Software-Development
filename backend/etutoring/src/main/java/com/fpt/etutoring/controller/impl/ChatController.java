package com.fpt.etutoring.controller.impl;

import com.fpt.etutoring.entity.impl.User;
import com.fpt.etutoring.service.MessageService;
import com.fpt.etutoring.service.UserService;
import com.fpt.etutoring.websocket.Message;
import com.fpt.etutoring.websocket.OutputMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
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

    @MessageMapping("/chat")
    @SendTo("/topic/messages")
    public synchronized OutputMessage send(final Message message) throws Exception {
        Long userId = Long.valueOf(message.getFrom());
        User user = userService.findById(userId);
        if (user == null)
            return new OutputMessage();

        Date date = new Date();
        final String time = new SimpleDateFormat("HH:mm").format(date);

        com.fpt.etutoring.entity.impl.Message msg = new com.fpt.etutoring.entity.impl.Message();
        msg.setUser(user);
        msg.setContent(message.getText());
        msg.setTime(date);
        messageService.createOrUpdate(msg);
        return new OutputMessage(message.getFrom(), message.getText(), time);
    }
}
