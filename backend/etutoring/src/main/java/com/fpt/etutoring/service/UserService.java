package com.fpt.etutoring.service;

import com.fpt.etutoring.entity.impl.User;

import java.util.List;

public interface UserService {
    User getUserByUsernameAndPassword(String username, String password);
    List<User> list();
    User createOrUpdate(User json);
    void delete(Long id);
    User findById(Long id);
}
