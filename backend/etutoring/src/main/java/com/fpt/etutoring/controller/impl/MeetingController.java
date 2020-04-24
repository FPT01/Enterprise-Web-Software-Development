package com.fpt.etutoring.controller.impl;

import com.fpt.etutoring.controller.BaseController;
import com.fpt.etutoring.controller.ResponseController;
import com.fpt.etutoring.dto.ResponseDTO;
import com.fpt.etutoring.dto.impl.MeetingDTO;
import com.fpt.etutoring.dto.impl.StudentDTO;
import com.fpt.etutoring.dto.impl.TutorDTO;
import com.fpt.etutoring.entity.impl.Meeting;
import com.fpt.etutoring.entity.impl.Student;
import com.fpt.etutoring.entity.impl.Tutor;
import com.fpt.etutoring.error.ApiMessage;
import com.fpt.etutoring.service.MeetingService;
import com.fpt.etutoring.service.StudentService;
import com.fpt.etutoring.service.TutorService;
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
    @Autowired
    private StudentService studentService;
    @Autowired
    private TutorService tutorService;

    @Override
    @GetMapping(Constant.PATH)
    public List<MeetingDTO> list() {
        List<Meeting> meetings = meetingService.list();
        List<MeetingDTO> meetingDTOS = new ArrayList<>();
        if (!CollectionUtils.isEmpty(meetings)) {
            meetings.forEach(m -> {
                List<StudentDTO> studentDTOS = new ArrayList<>();
                List<TutorDTO> tutorDTOS = new ArrayList<>();
                MeetingDTO meetingDTO = ResponseDTO.accepted().getObject(m, MeetingDTO.class);
                if (!CollectionUtils.isEmpty(m.getTutors())) {
                    m.getTutors().forEach(t -> {
                        TutorDTO tutorDTO = ResponseDTO.accepted().getObject(t, TutorDTO.class);
                        tutorDTO.setMeeting(null);
                        tutorDTO.getUser().setRole(null);
                        tutorDTOS.add(tutorDTO);
                    });
                    meetingDTO.setTutorDTOS(tutorDTOS);
                }
                if (!CollectionUtils.isEmpty(m.getStudents())) {
                    m.getStudents().forEach(s -> {
                        StudentDTO studentDTO = ResponseDTO.accepted().getObject(s, StudentDTO.class);
                        studentDTO.setMeeting(null);
                        studentDTO.getUser().setRole(null);
                        studentDTOS.add(studentDTO);
                    });
                    meetingDTO.setStudentDTOS(studentDTOS);
                }
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
            if (!CollectionUtils.isEmpty(json.getStudentDTOS())) {
                json.getStudentDTOS().forEach(s -> {
                    Student student = studentService.findById(s.getId());
                    if (student != null) {
                        from.getStudents().add(student);
                    }
                });
            }
            if (!CollectionUtils.isEmpty(json.getTutorDTOS())) {
                json.getTutorDTOS().forEach(t -> {
                    Tutor tutor = tutorService.findById(t.getId());
                    if (tutor != null) {
                        from.getTutors().add(tutor);
                    }
                });
            }
            meetingService.createOrUpdate(from);
            return buildResponseEntity(new ApiMessage(HttpStatus.OK, Constant.MSG_SUCCESS));
        } catch (Exception ex) {
            if (json.getId() == null)
                return buildResponseEntity(new ApiMessage(HttpStatus.OK, Constant.ERROR_INSERT));
            else
                return buildResponseEntity(new ApiMessage(HttpStatus.OK, Constant.ERROR_UPDATE));
        }
    }

    @Override
    @DeleteMapping(value = Constant.PATH_DELETE, consumes = "application/json", produces = "application/json")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        try {
            meetingService.delete(id);
        } catch (Exception ex) {
            return buildResponseEntity(new ApiMessage(HttpStatus.OK, ex));
        }
        return buildResponseEntity(new ApiMessage(HttpStatus.OK, Constant.MSG_SUCCESS));
    }

    @Override
    @GetMapping(value = Constant.PATH_FIND_BY_ID, consumes = "application/json", produces = "application/json")
    public ResponseEntity<?> findById(@PathVariable Long id) {
        Meeting m = meetingService.findById(id);
        if (m == null)
            return buildResponseEntity(new ApiMessage(HttpStatus.OK, Constant.ERROR_NOT_FOUND));

        MeetingDTO meetingDTO = ResponseDTO.accepted().getObject(m, MeetingDTO.class);
        List<StudentDTO> studentDTOS = new ArrayList<>();
        List<TutorDTO> tutorDTOS = new ArrayList<>();
        if (!CollectionUtils.isEmpty(m.getTutors())) {
            m.getTutors().forEach(t -> {
                TutorDTO tutorDTO = ResponseDTO.accepted().getObject(t, TutorDTO.class);
                tutorDTO.setMeeting(null);
                tutorDTO.getUser().setRole(null);
                tutorDTOS.add(tutorDTO);
            });
            meetingDTO.setTutorDTOS(tutorDTOS);
        }
        if (!CollectionUtils.isEmpty(m.getStudents())) {
            m.getStudents().forEach(s -> {
                StudentDTO studentDTO = ResponseDTO.accepted().getObject(s, StudentDTO.class);
                studentDTO.setMeeting(null);
                studentDTO.getUser().setRole(null);
                studentDTOS.add(studentDTO);
            });
            meetingDTO.setStudentDTOS(studentDTOS);
        }
        return ResponseEntity.status(HttpStatus.OK).body(ResponseDTO.accepted().getObject(meetingDTO, MeetingDTO.class));
    }
}
