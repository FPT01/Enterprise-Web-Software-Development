package com.fpt.etutoring.controller.impl;

import com.fpt.etutoring.controller.ResponseController;
import com.fpt.etutoring.dto.impl.EmailDTO;
import com.fpt.etutoring.entity.impl.User;
import com.fpt.etutoring.error.ApiMessage;
import com.fpt.etutoring.mail.EmailService;
import com.fpt.etutoring.service.UserService;
import com.fpt.etutoring.util.Constant;
import com.fpt.etutoring.util.StringUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(Constant.PATH_RESET_PASSWORD)
@CrossOrigin
public class ResetEmailController extends ResponseController {
    @Autowired
    private UserService userService;
    @Autowired
    private EmailService emailService;

    @PostMapping(value = Constant.PATH_SAVE, consumes = "application/json", produces = "application/json")
    public ResponseEntity<?> createOrUpdate(@RequestBody EmailDTO json) {
        User user = userService.findByEmail(json.getEmail());
        if (user == null)
            return buildResponseEntity(new ApiMessage(HttpStatus.BAD_REQUEST, Constant.ERROR_NOT_FOUND));

        String newpass = StringUtil.generateCommonLangPassword();
        user.setPassword(newpass);
        userService.createOrUpdate(user);

        emailService.sendSimpleMessage(user.getEmail(), Constant.EMAIL_TITLE, newpass);
        return buildResponseEntity(new ApiMessage(HttpStatus.OK, Constant.MSG_SUCCESS));
    }
}
