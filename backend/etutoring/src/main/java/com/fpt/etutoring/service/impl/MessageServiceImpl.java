package com.fpt.etutoring.service.impl;

import com.fpt.etutoring.dao.impl.MessageDao;
import com.fpt.etutoring.dto.impl.StatisticDTO;
import com.fpt.etutoring.entity.impl.Message;
import com.fpt.etutoring.entity.impl.User;
import com.fpt.etutoring.service.MessageService;
import com.fpt.etutoring.util.DateUtil;
import com.fpt.etutoring.util.RoleName;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.util.*;

@Service
public class MessageServiceImpl implements MessageService {
    @Autowired
    private MessageDao messageDao;

    @Override
    public List<Message> list() {
        return messageDao.findAll();
    }

    @Override
    public Message createOrUpdate(Message json) {
        return messageDao.save(json);
    }

    @Override
    public void delete(Long id) {
        messageDao.deleteById(id);
    }

    @Override
    public Message findById(Long id) {
        return messageDao.findById(id).get();
    }

    @Override
    public Long getMessagesLastSevenDays() {
        return messageDao.getMessagesLastSevenDays(DateUtil.getLastSevenDays());
    }

    @Override
    public List<StatisticDTO> getAverageMsg() {
        List<StatisticDTO> dtos = new ArrayList<>();
        List<Message> messages = messageDao.getMessageByRoleName(RoleName.TUTOR.getValue());
        Map<User,List<Message>> msgGroupByUsers = new HashMap<>();
        if (!CollectionUtils.isEmpty(messages)) {
            messages.forEach(m -> {
                if (m.getUser() != null) {
                    List<Message> messageList;
                    if(msgGroupByUsers.containsKey(m.getUser())) {
                        messageList = msgGroupByUsers.get(m.getUser());
                        messageList.add(m);
                    } else {
                        messageList = new ArrayList<>();
                        messageList.add(m);
                        msgGroupByUsers.put(m.getUser(), messageList);
                    }
                }
            });
        }

        Map<User, Float> mapAverageMsg = new HashMap<>();
        msgGroupByUsers.forEach((k,v) -> {
            List<Message> msgs = v;
            List<Date> sameTimes = new ArrayList<>();
            msgs.forEach(m -> {
                Date result = sameTimes.stream()
                        .filter(date -> DateUtil.isSameDay(date, m.getTime()))
                        .findAny().orElse(null);
                if (result == null)
                    sameTimes.add(m.getTime());
            });
            if (sameTimes.size() > 0) {
                Float averageMsg = Float.valueOf(msgs.size() / sameTimes.size());
                mapAverageMsg.put(k, averageMsg);
            }
        });
        mapAverageMsg.forEach((k,v) -> {
            StatisticDTO dto = new StatisticDTO();
            dto.setUserId(k.getId());
            dto.setFullname(k.getFullname());
            dto.setAverageMsg(v);
            dtos.add(dto);
        });
        return dtos;
    }
}
