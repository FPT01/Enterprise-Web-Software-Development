package com.fpt.etutoring.service.impl;

import com.fpt.etutoring.dao.impl.BlogPostDao;
import com.fpt.etutoring.entity.impl.BlogPost;
import com.fpt.etutoring.service.BlogPostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BlogPostServiceImpl implements BlogPostService {
    @Autowired
    private BlogPostDao blogPostDao;

    @Override
    public List<BlogPost> list() {
        return blogPostDao.findAll();
    }

    @Override
    public BlogPost createOrUpdate(BlogPost json) {
        return blogPostDao.save(json);
    }

    @Override
    public void delete(Long id) {
        blogPostDao.deleteById(id);
    }

    @Override
    public BlogPost findById(Long id) {
        return blogPostDao.findById(id).get();
    }

    @Override
    public Long getTotalBlogByUserId(Long userId) {
        return blogPostDao.getTotalBlogByUserId(userId);
    }
}
