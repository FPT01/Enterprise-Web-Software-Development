package com.fpt.etutoring.service;

import com.fpt.etutoring.entity.impl.Allocation;

import java.util.List;

public interface AllocationService {
    void createOrUpdate(List<Allocation> allocations);
    void delete(Long id);
    List<Allocation> findByRoomId(Long id);
    void deleteList(List<Allocation> allocations);
}
