package com.fpt.etutoring.service.impl;

import com.fpt.etutoring.dao.impl.BlogCommentDao;
import com.fpt.etutoring.entity.impl.BlogComment;
import com.fpt.etutoring.service.BlogCommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BlogCommentServiceImpl implements BlogCommentService {
    @Autowired
    private BlogCommentDao blogCommentDao;

    @Override
    public List<BlogComment> list() {
        return blogCommentDao.findAll();
    }

    @Override
    public BlogComment createOrUpdate(BlogComment json) {
        return blogCommentDao.save(json);
    }

    @Override
    public void delete(Long id) {
        blogCommentDao.deleteById(id);
    }

    @Override
    public BlogComment findById(Long id) {
        return blogCommentDao.findById(id).get();
    }
}
