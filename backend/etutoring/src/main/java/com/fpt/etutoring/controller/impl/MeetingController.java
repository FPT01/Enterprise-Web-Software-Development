package com.fpt.etutoring.controller.impl;

import com.fpt.etutoring.controller.BaseController;
import com.fpt.etutoring.dto.ResponseDTO;
import com.fpt.etutoring.dto.impl.MeetingDTO;
import com.fpt.etutoring.entity.impl.Meeting;
import com.fpt.etutoring.service.MeetingService;
import com.fpt.etutoring.util.Constant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(Constant.PATH_MEETING)
@CrossOrigin
public class MeetingController implements BaseController<MeetingDTO, Long> {

    @Autowired
    private MeetingService meetingService;

    @Override
    @GetMapping(Constant.PATH)
    public List<MeetingDTO> list() {
        List<Meeting> meetings = meetingService.list();
        List<MeetingDTO> meetingDTOS = new ArrayList<>();
        if (!CollectionUtils.isEmpty(meetings)) {
            meetings.forEach(m -> {
                MeetingDTO meetingDTO = ResponseDTO.accepted().getObject(m, MeetingDTO.class);
                meetingDTOS.add(meetingDTO);
            });
        }
        return meetingDTOS;
    }

    @Override
    @PostMapping(value = Constant.PATH_SAVE, consumes = "application/json", produces = "application/json")
    public MeetingDTO createOrUpdate(@RequestBody MeetingDTO json) {
        Meeting from = ResponseDTO.accepted().getObject(json, Meeting.class);
        Meeting meeting = meetingService.createOrUpdate(from);
        return ResponseDTO.accepted().getObject(meeting, MeetingDTO.class);
    }

    @Override
    @DeleteMapping(value = Constant.PATH_DELETE, consumes = "application/json", produces = "application/json")
    public void delete(@PathVariable Long id) {
        meetingService.delete(id);
    }

    @Override
    @GetMapping(value = Constant.PATH_FIND_BY_ID, consumes = "application/json", produces = "application/json")
    public MeetingDTO findById(@PathVariable Long id) {
        Meeting meeting = meetingService.findById(id);
        return ResponseDTO.accepted().getObject(meeting, MeetingDTO.class);
    }
}
