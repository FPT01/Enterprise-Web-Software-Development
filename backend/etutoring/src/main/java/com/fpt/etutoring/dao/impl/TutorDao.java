package com.fpt.etutoring.dao.impl;

import com.fpt.etutoring.entity.impl.Tutor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TutorDao extends JpaRepository<Tutor, Long> {
    //List<Tutor> findByMeetingId(Long id);
}
