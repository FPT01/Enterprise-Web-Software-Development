package com.fpt.etutoring.service;

import com.fpt.etutoring.entity.impl.BlogPost;

import java.util.List;

public interface BlogPostService {
    List<BlogPost> list();
    BlogPost createOrUpdate(BlogPost json);
    void delete(Long id);
    BlogPost findById(Long id);
}
