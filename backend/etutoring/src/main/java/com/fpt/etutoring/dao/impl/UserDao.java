package com.fpt.etutoring.dao.impl;


import com.fpt.etutoring.entity.impl.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserDao extends JpaRepository<User, Long> {
    public User findUsersByUsernameAndEnabled(String username, short enable);

    public List<User> getUserByUsername(String username);

    public User getUserByUsernameAndPassword(String username, String password);

    public List<User> getUserByEmail(String email);
}
