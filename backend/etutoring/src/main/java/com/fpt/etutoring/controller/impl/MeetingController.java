package com.fpt.etutoring.controller.impl;

import com.fpt.etutoring.controller.BaseController;
import com.fpt.etutoring.controller.ResponseController;
import com.fpt.etutoring.dto.ResponseDTO;
import com.fpt.etutoring.dto.impl.MeetingDTO;
import com.fpt.etutoring.entity.impl.Meeting;
import com.fpt.etutoring.error.ApiMessage;
import com.fpt.etutoring.service.MeetingService;
import com.fpt.etutoring.util.Constant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(Constant.PATH_MEETING)
@CrossOrigin
public class MeetingController extends ResponseController implements BaseController<MeetingDTO, Long> {

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
    public ResponseEntity<?> createOrUpdate(@RequestBody MeetingDTO json) {
        try {
            Meeting from = ResponseDTO.accepted().getObject(json, Meeting.class);
            meetingService.createOrUpdate(from);
            return buildResponseEntity(new ApiMessage(HttpStatus.OK, Constant.MSG_SUCCESS));
        } catch (Exception ex) {
            if (json.getId() == null)
                return buildResponseEntity(new ApiMessage(HttpStatus.BAD_REQUEST, Constant.ERROR_INSERT));
            else
                return buildResponseEntity(new ApiMessage(HttpStatus.BAD_REQUEST, Constant.ERROR_UPDATE));
        }
    }

    @Override
    @DeleteMapping(value = Constant.PATH_DELETE, consumes = "application/json", produces = "application/json")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        try {
            meetingService.delete(id);
        } catch (Exception ex) {
            return buildResponseEntity(new ApiMessage(HttpStatus.BAD_REQUEST, ex));
        }
        return buildResponseEntity(new ApiMessage(HttpStatus.OK, Constant.MSG_SUCCESS));
    }

    @Override
    @GetMapping(value = Constant.PATH_FIND_BY_ID, consumes = "application/json", produces = "application/json")
    public ResponseEntity<?> findById(@PathVariable Long id) {
        Meeting meeting = meetingService.findById(id);
        if (meeting == null)
            return buildResponseEntity(new ApiMessage(HttpStatus.BAD_REQUEST, Constant.ERROR_NOT_FOUND));
        return ResponseEntity.status(HttpStatus.OK).body(ResponseDTO.accepted().getObject(meeting, MeetingDTO.class));
    }
}
