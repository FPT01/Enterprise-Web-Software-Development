package com.fpt.etutoring.service.impl;

import com.fpt.etutoring.dao.impl.NotifocationDao;
import com.fpt.etutoring.entity.impl.Notification;
import com.fpt.etutoring.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationServiceImpl implements NotificationService {
    @Autowired
    private NotifocationDao notifocationDao;

    @Override
    public List<Notification> list() {
        return notifocationDao.findAll();
    }

    @Override
    public Notification createOrUpdate(Notification json) {
        return notifocationDao.save(json);
    }

    @Override
    public void delete(Long id) {
        notifocationDao.deleteById(id);
    }

    @Override
    public Notification findById(Long id) {
        return notifocationDao.findById(id).get();
    }
}
