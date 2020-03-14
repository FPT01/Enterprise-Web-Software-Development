package com.fpt.etutoring.controller.impl;

import com.fpt.etutoring.controller.BaseController;
import com.fpt.etutoring.dto.ResponseDTO;
import com.fpt.etutoring.dto.impl.DashboardInfoDTO;
import com.fpt.etutoring.entity.impl.DashboardInfo;
import com.fpt.etutoring.error.ApiMessage;
import com.fpt.etutoring.service.DashboardInfoService;
import com.fpt.etutoring.util.Constant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<?> createOrUpdate(@RequestBody DashboardInfoDTO json) {
        try {
            DashboardInfo from = ResponseDTO.accepted().getObject(json, DashboardInfo.class);
            dashboardInfoService.createOrUpdate(from);
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
            dashboardInfoService.delete(id);
        } catch (Exception ex) {
            return buildResponseEntity(new ApiMessage(HttpStatus.BAD_REQUEST, ex));
        }
        return buildResponseEntity(new ApiMessage(HttpStatus.OK, Constant.MSG_SUCCESS));
    }

    @Override
    @GetMapping(value = Constant.PATH_FIND_BY_ID, consumes = "application/json", produces = "application/json")
    public ResponseEntity<?> findById(@PathVariable Long id) {
        DashboardInfo dashboardInfo = dashboardInfoService.findById(id);
        if (dashboardInfo == null)
            return buildResponseEntity(new ApiMessage(HttpStatus.BAD_REQUEST, Constant.ERROR_NOT_FOUND));
        return ResponseEntity.status(HttpStatus.OK).body(ResponseDTO.accepted().getObject(dashboardInfo, DashboardInfoDTO.class));
    }

    @Override
    public ResponseEntity<?> buildResponseEntity(ApiMessage apiMessage) {
        return new ResponseEntity<>(apiMessage, apiMessage.getStatus());
    }
}
