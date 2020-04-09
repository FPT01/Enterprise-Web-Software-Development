package com.fpt.etutoring.mail.impl;

import com.fpt.etutoring.mail.EmailService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring5.SpringTemplateEngine;

import javax.mail.internet.MimeMessage;
import java.nio.charset.StandardCharsets;

@Component
public class EmailServiceImpl implements EmailService {

    private static final Logger LOG = LoggerFactory.getLogger(EmailServiceImpl.class);

    @Autowired
    public JavaMailSender emailSender;
    @Autowired
    private SpringTemplateEngine templateEngine;

    @Override
    public void sendSimpleMessage(String to, String subject, String password) {
        try {
            MimeMessage message = emailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message,
                    MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED,
                    StandardCharsets.UTF_8.name());
            Context context = new Context();
            context.setVariable("password", password);
            String html = templateEngine.process("email", context);

            to = to.replace("'", "");
            helper.setTo(to);
            helper.setText(html, true);
            helper.setSubject(subject);
            emailSender.send(message);
        } catch (Exception exception) {
           LOG.error(exception.getMessage());
        }
    }
}
