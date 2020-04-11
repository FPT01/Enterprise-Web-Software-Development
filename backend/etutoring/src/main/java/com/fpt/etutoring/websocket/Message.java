package com.fpt.etutoring.websocket;

import lombok.Data;

@Data
public class Message {
    private String from;
    private String text;
}
