package com.fpt.etutoring.dao.impl;

import com.fpt.etutoring.entity.impl.Allocation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AllocationDao extends JpaRepository<Allocation, Long> {
}
