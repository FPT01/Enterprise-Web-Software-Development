package com.fpt.etutoring.controller.impl;

import com.fpt.etutoring.controller.BaseController;
import com.fpt.etutoring.dto.ResponseDTO;
import com.fpt.etutoring.dto.impl.RoomDTO;
import com.fpt.etutoring.entity.impl.Room;
import com.fpt.etutoring.service.RoomService;
import com.fpt.etutoring.util.Constant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(Constant.PATH_ROOM)
public class RoomController implements BaseController<RoomDTO, Long> {
    @Autowired
    private RoomService roomService;

    @Override
    @GetMapping(Constant.PATH)
    public List<RoomDTO> list() {
        List<Room> rooms = roomService.list();
        List<RoomDTO> roomDTOS = new ArrayList<>();
        if (!CollectionUtils.isEmpty(rooms)) {
            rooms.forEach(r -> {
                RoomDTO roomDTO = ResponseDTO.accepted().getObject(r, RoomDTO.class);
                roomDTOS.add(roomDTO);
            });
        }
        return roomDTOS;
    }

    @Override
    @PostMapping(value = Constant.PATH_SAVE, consumes = "application/json", produces = "application/json")
    public RoomDTO createOrUpdate(@RequestBody RoomDTO json) {
        Room from = ResponseDTO.accepted().getObject(json, Room.class);
        Room room = roomService.createOrUpdate(from);
        return ResponseDTO.accepted().getObject(room, RoomDTO.class);
    }

    @Override
    @DeleteMapping(value = Constant.PATH_DELETE, consumes = "application/json", produces = "application/json")
    public void delete(@PathVariable Long id) {
        roomService.delete(id);
    }

    @Override
    @GetMapping(value = Constant.PATH_FIND_BY_ID, consumes = "application/json", produces = "application/json")
    public RoomDTO findById(@PathVariable Long id) {
        Room room = roomService.findById(id);
        return ResponseDTO.accepted().getObject(room, RoomDTO.class);
    }
}
