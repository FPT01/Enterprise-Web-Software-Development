package com.fpt.etutoring.websocket;

import lombok.Data;

@Data
public class OutputMessage {
    private String from;
    private String text;
    private String time;

    public OutputMessage () {}
    public OutputMessage(String from, String text, String time) {
        this.from = from;
        this.text = text;
        this.time = time;
    }
}
