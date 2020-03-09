package com.fpt.etutoring.controller.impl;

import com.fpt.etutoring.controller.BaseController;
import com.fpt.etutoring.dto.ResponseDTO;
import com.fpt.etutoring.dto.impl.DashboardInfoDTO;
import com.fpt.etutoring.entity.impl.DashboardInfo;
import com.fpt.etutoring.service.DashboardInfoService;
import com.fpt.etutoring.util.Constant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(Constant.PATH_DASHBOARD_INFO)
@CrossOrigin
public class DashboardInfoController implements BaseController<DashboardInfoDTO, Long> {

    @Autowired
    private DashboardInfoService dashboardInfoService;


    @Override
    @GetMapping(Constant.PATH)
    public List<DashboardInfoDTO> list() {
        List<DashboardInfo> dashboardInfos = dashboardInfoService.list();
        List<DashboardInfoDTO> dashboardInfoDTOS = new ArrayList<>();
        if (!CollectionUtils.isEmpty(dashboardInfos)) {
            dashboardInfoDTOS.forEach(d -> {
                DashboardInfoDTO dashboardInfoDTO = ResponseDTO.accepted().getObject(d, DashboardInfoDTO.class);
                dashboardInfoDTOS.add(dashboardInfoDTO);
            });
        }
        return dashboardInfoDTOS;
    }

    @Override
    @PostMapping(value = Constant.PATH_SAVE, consumes = "application/json", produces = "application/json")
    public DashboardInfoDTO createOrUpdate(@RequestBody DashboardInfoDTO json) {
        DashboardInfo from = ResponseDTO.accepted().getObject(json, DashboardInfo.class);
        DashboardInfo dashboardInfo = dashboardInfoService.createOrUpdate(from);
        return ResponseDTO.accepted().getObject(dashboardInfo, DashboardInfoDTO.class);
    }

    @Override
    @DeleteMapping(value = Constant.PATH_DELETE, consumes = "application/json", produces = "application/json")
    public void delete(@PathVariable Long id) {
        dashboardInfoService.delete(id);
    }

    @Override
    @GetMapping(value = Constant.PATH_FIND_BY_ID, consumes = "application/json", produces = "application/json")
    public DashboardInfoDTO findById(@PathVariable Long id) {
        DashboardInfo dashboardInfo = dashboardInfoService.findById(id);
        return ResponseDTO.accepted().getObject(dashboardInfo, DashboardInfoDTO.class);
    }
}
