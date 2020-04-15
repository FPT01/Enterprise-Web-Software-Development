//package com.fpt.etutoring.service.impl;
//
//import com.fpt.etutoring.dao.impl.CommentDao;
//import com.fpt.etutoring.entity.impl.Comment;
//import com.fpt.etutoring.service.CommentService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//
//@Service
//public class CommentServiceImpl implements CommentService {
//    @Autowired
//    private CommentDao commentDao;
//
//    @Override
//    public List<Comment> list() {
//        return commentDao.findAll();
//    }
//
//    @Override
//    public Comment createOrUpdate(Comment json) {
//        return commentDao.save(json);
//    }
//
//    @Override
//    public void delete(Long id) {
//        commentDao.deleteById(id);
//    }
//
//    @Override
//    public Comment findById(Long id) {
//        return commentDao.findById(id).get();
//    }
//}
