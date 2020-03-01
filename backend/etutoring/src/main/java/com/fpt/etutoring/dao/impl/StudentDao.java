package com.fpt.etutoring.dao.impl;

import com.fpt.etutoring.entity.impl.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentDao extends JpaRepository<Student, Long> {
}
