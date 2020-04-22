package com.fpt.etutoring.dao.impl;

import com.fpt.etutoring.entity.impl.BlogPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface BlogPostDao extends JpaRepository<BlogPost, Long> {
    @Query("SELECT count (b) FROM BlogPost b WHERE b.user.id= :userId")
    Long getTotalBlogByUserId(@Param("userId") Long userId);
}
