package com.fpt.etutoring.dao.impl;

import com.fpt.etutoring.entity.impl.Meeting;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MeetingDao extends JpaRepository<Meeting, Long> {
}
