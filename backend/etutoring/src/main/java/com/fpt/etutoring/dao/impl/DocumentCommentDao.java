package com.fpt.etutoring.dao.impl;

import com.fpt.etutoring.entity.impl.DocumentComment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DocumentCommentDao extends JpaRepository<DocumentComment, Long> {
}
