package com.fpt.etutoring.service.impl;

import com.fpt.etutoring.dao.impl.MeetingDao;
import com.fpt.etutoring.entity.impl.Meeting;
import com.fpt.etutoring.service.MeetingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MeetingServiceImpl implements MeetingService {
    @Autowired
    private MeetingDao meetingDao;

    @Override
    public List<Meeting> list() {
        return meetingDao.findAll();
    }

    @Override
    public Meeting createOrUpdate(Meeting json) {
        return meetingDao.save(json);
    }

    @Override
    public void delete(Long id) {
        meetingDao.deleteById(id);
    }

    @Override
    public Meeting findById(Long id) {
        return meetingDao.findById(id).get();
    }

    @Override
    public Long totalTutorMeetings(Long userId) {
        return meetingDao.totalTutorMeetings(userId);
    }

    @Override
    public Long totalStudentMeetings(Long userId) {
        return meetingDao.totaStudentMeetings(userId);
    }
}
