package com.fpt.etutoring.service;

import com.fpt.etutoring.entity.impl.DocumentComment;

import java.util.List;

public interface DocumentCommentService {
    List<DocumentComment> list();
    DocumentComment createOrUpdate(DocumentComment json);
    void delete(Long id);
    DocumentComment findById(Long id);
}
