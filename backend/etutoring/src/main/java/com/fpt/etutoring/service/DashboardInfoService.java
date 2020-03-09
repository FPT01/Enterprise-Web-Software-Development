package com.fpt.etutoring.service;

import com.fpt.etutoring.entity.impl.DashboardInfo;

import java.util.List;

public interface DashboardInfoService {
    List<DashboardInfo> list();
    DashboardInfo createOrUpdate(DashboardInfo json);
    void delete(Long id);
    DashboardInfo findById(Long id);
}
