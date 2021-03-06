package com.fpt.etutoring.dao.impl;

import com.fpt.etutoring.entity.impl.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentDao extends JpaRepository<Student, Long> {
    @Query("SELECT u FROM Student u " +
            "WHERE u.user.id NOT IN (SELECT m.sender.id FROM Message m) " +
            "AND u.user.id NOT IN (SELECT m.receiver.id FROM Message m)")
    List<Student> findStudentsWithoutTutor();

    //List<Student> findByMeetingId(Long id);

    @Query("SELECT s FROM Student s JOIN s.meetings m JOIN m.tutors t " +
            "WHERE s.id = :studentId AND t.id = :tutorId")
    List<Student> findStudentHasMeetingWithTutor(@Param("studentId") Long studentId,
                                                 @Param("tutorId") Long tutorId);

    Student findStudentByUserId(Long id);
}