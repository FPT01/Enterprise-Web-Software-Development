package com.fpt.etutoring.dao;

import java.io.Serializable;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fpt.etutoring.entity.BaseEntity;

public interface BaseDao<T extends BaseEntity> extends JpaRepository<T, Serializable> {
}
