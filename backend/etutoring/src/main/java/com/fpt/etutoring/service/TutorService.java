package com.fpt.etutoring.service;

import com.fpt.etutoring.entity.impl.Tutor;

import java.util.List;

public interface TutorService {
    List<Tutor> list();
    Tutor createOrUpdate(Tutor json);
    void delete(Long id);
    Tutor findById(Long id);
    void saveAll(List<Tutor> tutors);
    List<Tutor> findByMeetingId(Long id);
}
