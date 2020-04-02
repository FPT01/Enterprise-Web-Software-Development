package com.fpt.etutoring.controller.impl;

import com.fpt.etutoring.controller.BaseController;
import com.fpt.etutoring.controller.ResponseController;
import com.fpt.etutoring.converter.StringToDashboardInfoDTOConverter;
import com.fpt.etutoring.dto.ResponseDTO;
import com.fpt.etutoring.dto.impl.DashboardInfoDTO;
import com.fpt.etutoring.entity.impl.DashboardInfo;
import com.fpt.etutoring.entity.impl.User;
import com.fpt.etutoring.error.ApiMessage;
import com.fpt.etutoring.service.DashboardInfoService;
import com.fpt.etutoring.service.UserService;
import com.fpt.etutoring.storage.StorageService;
import com.fpt.etutoring.util.Constant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(Constant.PATH_DASHBOARD_INFO)
@CrossOrigin
public class DashboardInfoController extends ResponseController
        implements BaseController<DashboardInfoDTO, Long> {

    @Autowired
    private DashboardInfoService dashboardInfoService;
    @Autowired
    private StorageService storageService;
    @Autowired
    private UserService userService;
    @Autowired
    private StringToDashboardInfoDTOConverter converter;


    @Override
    @GetMapping(Constant.PATH)
    public List<DashboardInfoDTO> list() {
        List<DashboardInfo> dashboardInfos = dashboardInfoService.list();
        List<DashboardInfoDTO> dashboardInfoDTOS = new ArrayList<>();
        if (!CollectionUtils.isEmpty(dashboardInfos)) {
            dashboardInfos.forEach(d -> {
                DashboardInfoDTO dashboardInfoDTO = ResponseDTO.accepted().getObject(d, DashboardInfoDTO.class);
                dashboardInfoDTOS.add(dashboardInfoDTO);
            });
        }
        return dashboardInfoDTOS;
    }

    @Override
    public ResponseEntity<?> createOrUpdate(DashboardInfoDTO json) {
        try {
            DashboardInfo from = ResponseDTO.accepted().getObject(json, DashboardInfo.class);
            if (json.getUser() != null) {
                User user = userService.findById(json.getUser().getId());
                from.setUser(user);
            }
            dashboardInfoService.createOrUpdate(from);
            return buildResponseEntity(new ApiMessage(HttpStatus.OK, Constant.MSG_SUCCESS));
        } catch (Exception ex) {
            if (json.getId() == null)
                return buildResponseEntity(new ApiMessage(HttpStatus.BAD_REQUEST, Constant.ERROR_INSERT));
            else
                return buildResponseEntity(new ApiMessage(HttpStatus.BAD_REQUEST, Constant.ERROR_UPDATE));
        }
    }

    @PostMapping(value = Constant.PATH_SAVE)
    public ResponseEntity<?> save(@RequestParam(value = "file", required = false) MultipartFile file,
                                  @RequestParam("dto") String source) {
        if (file.getSize() > 0)
            storageService.store(file);

        return createOrUpdate(converter.convert(source));
    }

    @Override
    @DeleteMapping(value = Constant.PATH_DELETE)
    public ResponseEntity<?> delete(@PathVariable Long id) {
        try {
            DashboardInfo dashboardInfo = dashboardInfoService.findById(id);
            if (dashboardInfo != null)
                storageService.deleteByFilename(dashboardInfo.getAvatar());

            dashboardInfoService.delete(id);
        } catch (Exception ex) {
            return buildResponseEntity(new ApiMessage(HttpStatus.BAD_REQUEST, ex));
        }
        return buildResponseEntity(new ApiMessage(HttpStatus.OK, Constant.MSG_SUCCESS));
    }

    @Override
    @GetMapping(value = Constant.PATH_FIND_BY_ID)
    public ResponseEntity<?> findById(@PathVariable Long id) {
        DashboardInfo dashboardInfo = dashboardInfoService.findById(id);
        if (dashboardInfo == null)
            return buildResponseEntity(new ApiMessage(HttpStatus.BAD_REQUEST, Constant.ERROR_NOT_FOUND));
        return ResponseEntity.status(HttpStatus.OK)
                .body(ResponseDTO.accepted()
                        .getObject(dashboardInfo, DashboardInfoDTO.class));
    }

    @GetMapping(value = Constant.PATH_LOAD_FILE)
    @ResponseBody
    public ResponseEntity<?> upload(@RequestParam(value = "filename") String filename) {
        if (filename == null)
            return buildResponseEntity(new ApiMessage(HttpStatus.BAD_REQUEST, Constant.ERROR_NOT_FOUND));

        Resource file = storageService.loadAsResource(filename);
        return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION,
                "attachment; filename=\"" + file.getFilename() + "\"").body(file);
    }

}
