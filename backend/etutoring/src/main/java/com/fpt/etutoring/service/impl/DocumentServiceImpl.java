package com.fpt.etutoring.service.impl;

import com.fpt.etutoring.dao.impl.DocumentDao;
import com.fpt.etutoring.entity.impl.Document;
import com.fpt.etutoring.service.DocumentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DocumentServiceImpl implements DocumentService {
    @Autowired
    private DocumentDao documentDao;

    @Override
    public List<Document> list() {
        return documentDao.findAll();
    }

    @Override
    public Document createOrUpdate(Document json) {
        return documentDao.save(json);
    }

    @Override
    public void delete(Long id) {
        documentDao.findById(id);
    }

    @Override
    public Document findById(Long id) {
        return documentDao.findById(id).get();
    }
}
