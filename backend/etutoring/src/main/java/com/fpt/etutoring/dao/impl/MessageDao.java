package com.fpt.etutoring.dao.impl;

import com.fpt.etutoring.entity.impl.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MessageDao extends JpaRepository<Message, Long> {
}
