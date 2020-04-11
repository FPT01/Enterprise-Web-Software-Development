package com.fpt.etutoring.service.impl;

import com.fpt.etutoring.dao.impl.UserDao;
import com.fpt.etutoring.entity.impl.User;
import com.fpt.etutoring.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserDao userDao;

    @Override
    public User getUserByUsernameAndPassword(String username, String password) {
        return userDao.getUserByUsernameAndPassword(username, password);
    }

    @Override
    public List<User> list() {
        return userDao.findAll();
    }

    @Override
    public User createOrUpdate(User json) {
        if (json == null)
            return null;
        return userDao.save(json);
    }

    @Override
    public void delete(Long id) {
        userDao.deleteById(id);
    }

    @Override
    public User findById(Long id) {
        if (id == null)
            return null;
        return userDao.findById(id).get();
    }

    @Override
    public User findByUsername(String username) {
        return userDao.getUserByUsername(username);
    }

    @Override
    public User findByEmail(String email) {
        return userDao.getUserByEmail(email);
    }
}
