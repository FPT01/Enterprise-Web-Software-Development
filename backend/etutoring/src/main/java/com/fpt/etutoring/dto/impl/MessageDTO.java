package com.fpt.etutoring.dto.impl;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fpt.etutoring.websocket.ChatMessage;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class MessageDTO {
    private ChatMessage.MessageType type;
    private String content;
    private String sender;
    private String receiver;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-M-yyyy hh:mm:ss")
    private Date dateTime;
}
