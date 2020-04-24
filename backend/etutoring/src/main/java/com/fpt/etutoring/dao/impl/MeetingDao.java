package com.fpt.etutoring.dao.impl;

import com.fpt.etutoring.entity.impl.Meeting;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface MeetingDao extends JpaRepository<Meeting, Long> {
    @Query("SELECT count(m) FROM Meeting m JOIN m.tutors t WHERE t.user.id = :userId")
    Long totalTutorMeetings(@Param("userId") Long userId);

    @Query("SELECT count(m) FROM Meeting m JOIN m.students t WHERE t.user.id = :userId")
    Long totalStudentMeetings(@Param("userId") Long userId);
}