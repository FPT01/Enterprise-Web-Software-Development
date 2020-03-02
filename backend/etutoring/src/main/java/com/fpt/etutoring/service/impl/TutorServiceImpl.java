package com.fpt.etutoring.service.impl;

import com.fpt.etutoring.dao.impl.TutorDao;
import com.fpt.etutoring.entity.impl.Tutor;
import com.fpt.etutoring.service.TutorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TutorServiceImpl implements TutorService {
    @Autowired
    private TutorDao tutorDao;

    @Override
    public List<Tutor> list() {
        return tutorDao.findAll();
    }

    @Override
    public Tutor createOrUpdate(Tutor json) {
        return tutorDao.save(json);
    }

    @Override
    public void delete(Long id) {
        tutorDao.deleteById(id);
    }

    @Override
    public Tutor findById(Long id) {
        return tutorDao.findById(id).get();
    }
}
