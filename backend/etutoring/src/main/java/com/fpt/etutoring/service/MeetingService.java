package com.fpt.etutoring.service;

import com.fpt.etutoring.entity.impl.Meeting;

import java.util.List;

public interface MeetingService {
    List<Meeting> list();
    Meeting createOrUpdate(Meeting json);
    void delete(Long id);
    Meeting findById(Long id);
}
