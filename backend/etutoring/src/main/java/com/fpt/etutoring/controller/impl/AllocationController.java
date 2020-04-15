package com.fpt.etutoring.controller.impl;

import com.fpt.etutoring.controller.BaseController;
import com.fpt.etutoring.controller.ResponseController;
import com.fpt.etutoring.dto.ResponseDTO;
import com.fpt.etutoring.dto.impl.*;
import com.fpt.etutoring.entity.impl.Allocation;
import com.fpt.etutoring.entity.impl.Room;
import com.fpt.etutoring.entity.impl.Student;
import com.fpt.etutoring.entity.impl.Tutor;
import com.fpt.etutoring.error.ApiMessage;
import com.fpt.etutoring.service.AllocationService;
import com.fpt.etutoring.service.RoomService;
import com.fpt.etutoring.service.StudentService;
import com.fpt.etutoring.service.TutorService;
import com.fpt.etutoring.util.Constant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.*;
import org.w3c.dom.ls.LSInput;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping(Constant.PATH_ALLOCATE)
@CrossOrigin
public class AllocationController extends ResponseController implements BaseController<AllocationDTO, Long> {
    @Autowired
    private AllocationService allocationService;
    @Autowired
    private RoomService roomService;
    @Autowired
    private TutorService tutorService;
    @Autowired
    private StudentService studentService;

//    @Override
//    @GetMapping(Constant.PATH)
//    public List<AllocationDTO> list() {
//        List<Allocation> allocations = allocationService.list();
//        List<AllocationDTO> allocationDTOS = new ArrayList<>();
//        if (!CollectionUtils.isEmpty(allocations)) {
//            allocations.forEach(a -> {
//                AllocationDTO allocationDTO = ResponseDTO.accepted().getObject(a, AllocationDTO.class);
//                allocationDTOS.add(allocationDTO);
//            });
//        }
//        return allocationDTOS;
//    }

    private List<Allocation> convertDtoToEntity(AllocationDTO dto) {
        List<Allocation> allocations = new ArrayList<>();
        Room room = roomService.findById(dto.getRoom().getId());
        dto.getTutors().forEach(t -> {
            Tutor tutor = tutorService.findById(t.getId());
            dto.getStudents().forEach(s -> {
                Student student = studentService.findById(s.getId());

                Allocation allocation = new Allocation();
                allocation.setRoom(room);
                allocation.setTutor(tutor);
                allocation.setStudent(student);
                allocations.add(allocation);
            });
        });
        return allocations;
    }

    @Override
    public List<AllocationDTO> list() {
        return null;
    }

    @Override
    @PostMapping(value = Constant.PATH_SAVE, consumes = "application/json", produces = "application/json")
    public ResponseEntity<?> createOrUpdate(@RequestBody  AllocationDTO json) {
        try {
            allocationService.createOrUpdate(convertDtoToEntity(json));
            return buildResponseEntity(new ApiMessage(HttpStatus.OK, Constant.MSG_SUCCESS));
        } catch (Exception ex) {
            return buildResponseEntity(new ApiMessage(HttpStatus.BAD_REQUEST, Constant.ERROR_INSERT));
        }
    }

    @Override
    @DeleteMapping(value = Constant.PATH_DELETE_BY_ROOM_ID, consumes = "application/json", produces = "application/json")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        try {
            List<Allocation> allocations = allocationService.findByRoomId(id);
            allocationService.deleteList(allocations);
        } catch (Exception ex) {
            return buildResponseEntity(new ApiMessage(HttpStatus.BAD_REQUEST, ex));
        }
        return buildResponseEntity(new ApiMessage(HttpStatus.OK, Constant.MSG_SUCCESS));
    }

    @Override
    @GetMapping(value = Constant.PATH_FIND_BY_ROOM_ID, consumes = "application/json", produces = "application/json")
    public ResponseEntity<?> findById(@PathVariable Long id) {
        List<Allocation> allocations = allocationService.findByRoomId(id);
        if (allocations == null)
            return buildResponseEntity(new ApiMessage(HttpStatus.BAD_REQUEST, Constant.ERROR_NOT_FOUND));

        AllocationDTO dto = convertEntityToDto(allocations);
        return ResponseEntity.status(HttpStatus.OK).body(ResponseDTO.accepted().getObject(dto, AllocationDTO.class));
    }

    private AllocationDTO convertEntityToDto(List<Allocation> allocations) {
        AllocationDTO dto = new AllocationDTO();
        RoomDTO roomDTO = ResponseDTO.accepted().getObject(allocations.get(0).getRoom(), RoomDTO.class);
        dto.setRoom(roomDTO);

        Set<TutorDTO> tutorDTOS = new HashSet<>();
        Set<StudentDTO> studentDTOS = new HashSet<>();
        allocations.forEach(a -> {
            StudentDTO studentDTO = ResponseDTO.accepted().getObject(a.getStudent(), StudentDTO.class);
            UserDTO user = studentDTO.getUser();
            user.setRole(null);
            studentDTO.setUser(user);

            TutorDTO tutorDTO = ResponseDTO.accepted().getObject(a.getTutor(), TutorDTO.class);
            user = tutorDTO.getUser();
            user.setRole(null);
            tutorDTO.setUser(user);

            if (!tutorDTOS.contains(tutorDTO))
                tutorDTOS.add(tutorDTO);

            if (!studentDTOS.contains(studentDTO))
                studentDTOS.add(studentDTO);
        });
        dto.setTutors(tutorDTOS);
        dto.setStudents(studentDTOS);
        return dto;
    }
}
