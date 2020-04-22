package com.fpt.etutoring.dao.impl;

import com.fpt.etutoring.entity.impl.BlogComment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface BlogCommentDao extends JpaRepository<BlogComment, Long> {
    @Query("SELECT count(b) FROM BlogComment b WHERE b.user.id = :userId")
    Long getTotalBlogCommentByUserId(@Param("userId") Long userId);
}
