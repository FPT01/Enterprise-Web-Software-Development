package com.fpt.etutoring.controller.impl;

import com.fpt.etutoring.controller.BaseController;
import com.fpt.etutoring.controller.ResponseController;
import com.fpt.etutoring.dto.ResponseDTO;
import com.fpt.etutoring.dto.impl.AllocationDTO;
import com.fpt.etutoring.entity.impl.Allocation;
import com.fpt.etutoring.error.ApiMessage;
import com.fpt.etutoring.service.AllocationService;
import com.fpt.etutoring.util.Constant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(Constant.PATH_ALLOCATE)
@CrossOrigin
public class AllocationController extends ResponseController implements BaseController<AllocationDTO, Long> {
    @Autowired
    private AllocationService allocationService;

    @Override
    @GetMapping(Constant.PATH)
    public List<AllocationDTO> list() {
        List<Allocation> allocations = allocationService.list();
        List<AllocationDTO> allocationDTOS = new ArrayList<>();
        if (!CollectionUtils.isEmpty(allocations)) {
            allocations.forEach(a -> {
                AllocationDTO allocationDTO = ResponseDTO.accepted().getObject(a, AllocationDTO.class);
                allocationDTOS.add(allocationDTO);
            });
        }
        return allocationDTOS;
    }

    @Override
    @PostMapping(value = Constant.PATH_SAVE, consumes = "application/json", produces = "application/json")
    public ResponseEntity<?> createOrUpdate(@RequestBody  AllocationDTO json) {
        try {
            Allocation from = ResponseDTO.accepted().getObject(json, Allocation.class);
            allocationService.createOrUpdate(from);
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
            allocationService.delete(id);
        } catch (Exception ex) {
            return buildResponseEntity(new ApiMessage(HttpStatus.BAD_REQUEST, ex));
        }
        return buildResponseEntity(new ApiMessage(HttpStatus.OK, Constant.MSG_SUCCESS));
    }

    @Override
    @GetMapping(value = Constant.PATH_FIND_BY_ID, consumes = "application/json", produces = "application/json")
    public ResponseEntity<?> findById(@PathVariable Long id) {
        Allocation allocation = allocationService.findById(id);
        if (allocation == null)
            return buildResponseEntity(new ApiMessage(HttpStatus.BAD_REQUEST, Constant.ERROR_NOT_FOUND));
        return ResponseEntity.status(HttpStatus.OK).body(ResponseDTO.accepted().getObject(allocation, AllocationDTO.class));
    }

    @Override
    public ResponseEntity<?> buildResponseEntity(ApiMessage apiMessage) {
        return new ResponseEntity<>(apiMessage, apiMessage.getStatus());
    }
}
