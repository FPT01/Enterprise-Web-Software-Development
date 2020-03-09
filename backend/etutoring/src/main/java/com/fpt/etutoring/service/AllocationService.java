package com.fpt.etutoring.service;

import com.fpt.etutoring.entity.impl.Allocation;

import java.util.List;

public interface AllocationService {
    List<Allocation> list();
    Allocation createOrUpdate(Allocation json);
    void delete(Long id);
    Allocation findById(Long id);
}
