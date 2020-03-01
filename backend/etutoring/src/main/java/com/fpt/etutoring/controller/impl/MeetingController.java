package com.fpt.etutoring.controller.impl;

import com.fpt.etutoring.controller.BaseController;
import com.fpt.etutoring.dto.impl.MeetingDTO;
import com.fpt.etutoring.util.Constant;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(Constant.PATH_MEETING)
@CrossOrigin
public class MeetingController implements BaseController<MeetingDTO, Long> {

    @Override
    public List<MeetingDTO> list() {
        return null;
    }

    @Override
    public MeetingDTO createOrUpdate(MeetingDTO json) {
        return null;
    }

    @Override
    public void delete(Long id) {

    }

    @Override
    public MeetingDTO findById(Long id) {
        return null;
    }
}
