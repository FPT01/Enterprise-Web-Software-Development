package com.fpt.etutoring.service.impl;

import com.fpt.etutoring.dao.impl.AllocationDao;
import com.fpt.etutoring.entity.impl.Allocation;
import com.fpt.etutoring.service.AllocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.util.List;

@Service
public class AllocationServiceImpl implements AllocationService {
    @Autowired
    private AllocationDao allocationDao;

    @Override
    public void createOrUpdate(List<Allocation> allocations) {
        allocationDao.saveAll(allocations);
    }

    @Override
    public void delete(Long id) {
        allocationDao.deleteById(id);
    }

    @Override
    public List<Allocation> findByRoomId(Long id) {
        return allocationDao.findAllByRoomId(id);
    }

    @Override
    public void deleteList(List<Allocation> allocations) {
        allocationDao.deleteAll(allocations);
    }

    @Override
    public Allocation findByStudentId(Long id) {
        List<Allocation> allocations = allocationDao.findByStudentId(id);
        if (!CollectionUtils.isEmpty(allocations))
            return allocations.get(0);
        return null;
    }
}
