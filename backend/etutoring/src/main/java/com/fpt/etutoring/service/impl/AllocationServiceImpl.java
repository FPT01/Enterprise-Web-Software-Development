package com.fpt.etutoring.service.impl;

import com.fpt.etutoring.dao.impl.AllocationDao;
import com.fpt.etutoring.entity.impl.Allocation;
import com.fpt.etutoring.service.AllocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AllocationServiceImpl implements AllocationService {
    @Autowired
    private AllocationDao allocationDao;

    @Override
    public List<Allocation> list() {
        return allocationDao.findAll();
    }

    @Override
    public Allocation createOrUpdate(Allocation json) {
        return allocationDao.save(json);
    }

    @Override
    public void delete(Long id) {
        allocationDao.deleteById(id);
    }

    @Override
    public Allocation findById(Long id) {
        return allocationDao.findById(id).get();
    }
}
