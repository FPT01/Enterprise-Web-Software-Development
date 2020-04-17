package com.fpt.etutoring.dao.impl;

import com.fpt.etutoring.entity.impl.Allocation;
import com.fpt.etutoring.entity.impl.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AllocationDao extends JpaRepository<Allocation, Long> {
    List<Allocation> findAllByRoomId(Long roomId);

    List<Allocation> findByStudentId(Long studentId);
}
