package com.fpt.etutoring.service;

import com.fpt.etutoring.entity.impl.BlogComment;

import java.util.List;

public interface BlogCommentService {
    List<BlogComment> list();
    BlogComment createOrUpdate(BlogComment json);
    void delete(Long id);
    BlogComment findById(Long id);
}
