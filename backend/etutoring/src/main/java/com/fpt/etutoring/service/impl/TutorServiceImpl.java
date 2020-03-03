package com.fpt.etutoring.service.impl;

import com.fpt.etutoring.dao.impl.TutorDao;
import com.fpt.etutoring.dao.impl.UserDao;
import com.fpt.etutoring.entity.impl.Tutor;
import com.fpt.etutoring.entity.impl.User;
import com.fpt.etutoring.service.TutorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TutorServiceImpl implements TutorService {
    @Autowired
    private TutorDao tutorDao;
    @Autowired
    private UserDao userDao;

    @Override
    public List<Tutor> list() {
        return tutorDao.findAll();
    }

    @Override
    public Tutor createOrUpdate(Tutor json) {
        return tutorDao.save(json);
    }

    @Override
    public void delete(Long id) {
       Optional<Tutor> optional = tutorDao.findById(id);
       if (optional.isPresent()) {
           User user = optional.get().getUser();
           if (user != null) {
               user.setEnabled(Short.valueOf(String.valueOf(0)));
               userDao.save(user);
           }
       }
    }

    @Override
    public Tutor findById(Long id) {
        return tutorDao.findById(id).get();
    }
}
