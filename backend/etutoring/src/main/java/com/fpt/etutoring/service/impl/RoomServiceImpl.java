package com.fpt.etutoring.service.impl;

import com.fpt.etutoring.dao.impl.RoomDao;
import com.fpt.etutoring.entity.impl.Room;
import com.fpt.etutoring.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoomServiceImpl implements RoomService {
    @Autowired
    private RoomDao roomDao;

    @Override
    public List<Room> list() {
        return roomDao.findAll();
    }

    @Override
    public Room createOrUpdate(Room json) {
        return roomDao.save(json);
    }

    @Override
    public void delete(Long id) {
        roomDao.deleteById(id);
    }

    @Override
    public Room findById(Long id) {
        return roomDao.findById(id).get();
    }
}
