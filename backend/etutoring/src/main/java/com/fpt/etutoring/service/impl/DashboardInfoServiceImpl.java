package com.fpt.etutoring.service.impl;

import com.fpt.etutoring.dao.impl.DashboardInfoDao;
import com.fpt.etutoring.entity.impl.DashboardInfo;
import com.fpt.etutoring.service.DashboardInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DashboardInfoServiceImpl implements DashboardInfoService {
    @Autowired
    private DashboardInfoDao dashboardInfoDao;

    @Override
    public List<DashboardInfo> list() {
        return dashboardInfoDao.findAll();
    }

    @Override
    public DashboardInfo createOrUpdate(DashboardInfo json) {
        return dashboardInfoDao.save(json);
    }

    @Override
    public void delete(Long id) {
        dashboardInfoDao.deleteById(id);
    }

    @Override
    public DashboardInfo findById(Long id) {
        return dashboardInfoDao.findById(id).get();
    }
}
