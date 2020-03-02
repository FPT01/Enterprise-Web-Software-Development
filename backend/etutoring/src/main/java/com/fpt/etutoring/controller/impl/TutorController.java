package com.fpt.etutoring.controller.impl;

import com.fpt.etutoring.controller.BaseController;
import com.fpt.etutoring.dto.ResponseDTO;
import com.fpt.etutoring.dto.impl.TutorDTO;
import com.fpt.etutoring.entity.impl.Tutor;
import com.fpt.etutoring.service.TutorService;
import com.fpt.etutoring.util.Constant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(Constant.PATH_TUTOR)
@CrossOrigin
public class TutorController implements BaseController<TutorDTO, Long> {

    @Autowired
    private TutorService tutorService;

    @Override
    @GetMapping(Constant.PATH)
    public List<TutorDTO> list() {
        List<Tutor> tutors = tutorService.list();
        List<TutorDTO> tutorDTOS = new ArrayList<>();
        if(!CollectionUtils.isEmpty(tutors)) {
            tutors.forEach(t -> {
                TutorDTO tutorDTO = ResponseDTO.accepted().getObject(t, TutorDTO.class);
                tutorDTOS.add(tutorDTO);
            });
        }
        return tutorDTOS;
    }

    @Override
    @PostMapping(value = Constant.PATH_SAVE, consumes = "application/json", produces = "application/json")
    public TutorDTO createOrUpdate(@RequestBody TutorDTO json) {
        Tutor from = ResponseDTO.accepted().getObject(json, Tutor.class);
        Tutor tutor = tutorService.createOrUpdate(from);
        return ResponseDTO.accepted().getObject(tutor, TutorDTO.class);
    }

    @Override
    @DeleteMapping(value = Constant.PATH_DELETE, consumes = "application/json", produces = "application/json")
    public void delete(@PathVariable Long id) {
        tutorService.delete(id);
    }

    @Override
    @GetMapping(value = Constant.PATH_FIND_BY_ID, consumes = "application/json", produces = "application/json")
    public TutorDTO findById(@PathVariable Long id) {
        Tutor tutor = tutorService.findById(id);
        return ResponseDTO.accepted().getObject(tutor, TutorDTO.class);
    }
}
