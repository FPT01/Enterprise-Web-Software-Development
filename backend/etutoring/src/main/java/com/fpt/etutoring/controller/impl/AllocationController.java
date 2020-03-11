package com.fpt.etutoring.controller.impl;

import com.fpt.etutoring.controller.BaseController;
import com.fpt.etutoring.dto.ResponseDTO;
import com.fpt.etutoring.dto.impl.AllocationDTO;
import com.fpt.etutoring.entity.impl.Allocation;
import com.fpt.etutoring.service.AllocationService;
import com.fpt.etutoring.util.Constant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(Constant.PATH_ALLOCATE)
@CrossOrigin
public class AllocationController implements BaseController<AllocationDTO, Long> {
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
    public AllocationDTO createOrUpdate(@RequestBody  AllocationDTO json) {
        Allocation from = ResponseDTO.accepted().getObject(json, Allocation.class);
        Allocation allocation = allocationService.createOrUpdate(from);
        return ResponseDTO.accepted().getObject(allocation, AllocationDTO.class);
    }

    @Override
    @DeleteMapping(value = Constant.PATH_DELETE, consumes = "application/json", produces = "application/json")
    public void delete(@PathVariable Long id) {
        allocationService.delete(id);
    }

    @Override
    @GetMapping(value = Constant.PATH_FIND_BY_ID, consumes = "application/json", produces = "application/json")
    public AllocationDTO findById(@PathVariable Long id) {
        Allocation allocation = allocationService.findById(id);
        return ResponseDTO.accepted().getObject(allocation, AllocationDTO.class);
    }
}
