package com.fpt.etutoring.dao.impl;

import com.fpt.etutoring.entity.impl.BlogPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BlogPostDao extends JpaRepository<BlogPost, Long> {

}
