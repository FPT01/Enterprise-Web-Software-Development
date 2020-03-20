package com.fpt.etutoring.controller.impl;

import com.fpt.etutoring.dto.impl.StatisticDTO;
import com.fpt.etutoring.error.ApiMessage;
import com.fpt.etutoring.service.MessageService;
import com.fpt.etutoring.util.Constant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@RequestMapping(Constant.PATH_STATISTIC)
public class StatisticController {

    @Autowired
    private MessageService messageService;

    @GetMapping(Constant.PATH_LAST_SEVEN_DAYS)
    public ResponseEntity<?> getLastSevenDays() {
        StatisticDTO dto = new StatisticDTO();
        dto.setLastSevenDays(messageService.getMessagesLastSevenDays());
        return ResponseEntity.status(HttpStatus.OK).body(dto);
    }

    @GetMapping(Constant.PATH_AVG_MSG)
    public ResponseEntity<?> getAvgMsg() {
        return ResponseEntity.status(HttpStatus.OK).body(messageService.getAverageMsg());
    }

    public ResponseEntity<?> buildResponseEntity(ApiMessage apiMessage) {
        return new ResponseEntity<>(apiMessage, apiMessage.getStatus());
    }

}
