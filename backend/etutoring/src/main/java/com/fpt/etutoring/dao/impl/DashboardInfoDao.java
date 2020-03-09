package com.fpt.etutoring.dao.impl;

import com.fpt.etutoring.entity.impl.DashboardInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DashboardInfoDao extends JpaRepository<DashboardInfo, Long> {
}
