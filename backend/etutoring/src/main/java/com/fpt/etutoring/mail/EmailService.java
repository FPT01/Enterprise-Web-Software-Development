package com.fpt.etutoring.mail;

public interface EmailService {
    void sendSimpleMessage(String to,
                           String subject, String password);
}
