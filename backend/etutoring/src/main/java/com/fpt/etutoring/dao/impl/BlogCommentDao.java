package com.fpt.etutoring.dao.impl;

import com.fpt.etutoring.entity.impl.BlogComment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BlogCommentDao extends JpaRepository<BlogComment, Long> {
}
