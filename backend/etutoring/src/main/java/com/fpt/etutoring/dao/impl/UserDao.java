package com.fpt.etutoring.dao.impl;


import com.fpt.etutoring.entity.impl.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserDao extends JpaRepository<User, Long> {
    public User findUsersByUsernameAndEnabled(String username, short enable);

    public User getUserByUsername(String username);

    public User getUserByUsernameAndPassword(String username, String password);
}
