package com.fpt.etutoring.dao.impl;

import com.fpt.etutoring.entity.impl.Document;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DocumentDao extends JpaRepository<Document, Long> {
}
