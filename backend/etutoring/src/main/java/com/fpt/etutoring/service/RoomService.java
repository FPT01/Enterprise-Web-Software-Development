package com.fpt.etutoring.service;

import com.fpt.etutoring.entity.impl.Room;

import java.util.List;

public interface RoomService {
    List<Room> list();
    Room createOrUpdate(Room json);
    void delete(Long id);
    Room findById(Long id);
}
