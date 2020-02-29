package com.fpt.etutoring.controller.impl;

import com.fpt.etutoring.controller.BaseController;
import com.fpt.etutoring.entity.impl.UserInfo;
import com.fpt.etutoring.util.Constant;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(Constant.PATH_USER_INFO)
public class UserInfoController extends BaseController<UserInfo> {

}
