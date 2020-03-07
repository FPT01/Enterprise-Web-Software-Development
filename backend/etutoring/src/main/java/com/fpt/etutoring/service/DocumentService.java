package com.fpt.etutoring.service;

import com.fpt.etutoring.entity.impl.Document;

import java.util.List;

public interface DocumentService {
    List<Document> list();
    Document createOrUpdate(Document json);
    void delete(Long id);
    Document findById(Long id);
}
