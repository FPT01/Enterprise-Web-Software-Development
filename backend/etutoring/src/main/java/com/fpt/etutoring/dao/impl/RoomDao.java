package com.fpt.etutoring.dao.impl;

import com.fpt.etutoring.entity.impl.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoomDao extends JpaRepository<Room, Long> {
}
