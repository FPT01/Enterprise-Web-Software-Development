package com.fpt.etutoring.service.impl;

import com.fpt.etutoring.dao.impl.MessageDao;
import com.fpt.etutoring.entity.impl.Message;
import com.fpt.etutoring.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MessageImpl implements MessageService {
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
}
