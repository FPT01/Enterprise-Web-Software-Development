package com.fpt.etutoring.service;

import com.fpt.etutoring.dto.impl.StatisticDTO;
import com.fpt.etutoring.entity.impl.Message;

import java.util.List;

public interface MessageService {
    List<Message> list();
    Message createOrUpdate(Message json);
    void delete(Long id);
    Message findById(Long id);
    Long getMessagesLastSevenDays();
    List<StatisticDTO> getAverageMsg();
}
