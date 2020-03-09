package com.fpt.etutoring.service;

import com.fpt.etutoring.entity.impl.Comment;

import java.util.List;

public interface CommentService {
    List<Comment> list();
    Comment createOrUpdate(Comment json);
    void delete(Long id);
    Comment findById(Long id);
}
