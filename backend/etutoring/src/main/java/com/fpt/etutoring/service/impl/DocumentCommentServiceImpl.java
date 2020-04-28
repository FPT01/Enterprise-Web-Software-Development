package com.fpt.etutoring.service.impl;

import com.fpt.etutoring.dao.impl.DocumentCommentDao;
import com.fpt.etutoring.entity.impl.DocumentComment;
import com.fpt.etutoring.service.DocumentCommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DocumentCommentServiceImpl implements DocumentCommentService {
    @Autowired
    private DocumentCommentDao documentCommentDao;

    @Override
    public List<DocumentComment> list() {
        return documentCommentDao.findAll();
    }

    @Override
    public DocumentComment createOrUpdate(DocumentComment json) {
        return documentCommentDao.save(json);
    }

    @Override
    public void delete(Long id) {
        documentCommentDao.deleteById(id);
    }

    @Override
    public DocumentComment findById(Long id) {
        return documentCommentDao.findById(id).get();
    }
}
