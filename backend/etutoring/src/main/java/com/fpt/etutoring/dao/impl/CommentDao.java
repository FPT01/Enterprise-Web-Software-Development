package com.fpt.etutoring.dao.impl;

import com.fpt.etutoring.entity.impl.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentDao extends JpaRepository<Comment, Long> {
}
