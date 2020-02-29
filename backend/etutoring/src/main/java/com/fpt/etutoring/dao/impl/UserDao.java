package com.fpt.etutoring.dao.impl;

import org.springframework.context.annotation.Primary;

import com.fpt.etutoring.dao.BaseDao;
import com.fpt.etutoring.entity.impl.User;

@Primary
public interface UserDao extends BaseDao<User> {
    public User findUsersByUsernameAndEnabled(String username, short enable);

    public User getUserByUsername(String username);

    public User getUserByUsernameAndPassword(String username, String password);
}
