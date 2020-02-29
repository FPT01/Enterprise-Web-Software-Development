package com.fpt.etutoring.controller;

import java.util.List;

import com.fpt.etutoring.util.Constant;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.fpt.etutoring.dao.BaseDao;
import com.fpt.etutoring.entity.BaseEntity;

@Slf4j
@RestController
@CrossOrigin
public abstract class BaseController<T extends BaseEntity> {
    @Autowired
    private BaseDao<T> dao;

    @GetMapping
    public List<T> list() {
        return dao.findAll();
    }

    @PostMapping
    public T create(@RequestBody T entity) {
        return dao.save(entity);
    }

    @PutMapping(value = Constant.PATH_VARIABLE_ID)
    public T update(@PathVariable(value = Constant.PATH_VARIABLE_ID) long id, @RequestBody T entity) {
        return dao.save(entity);
    }

    @DeleteMapping(value = Constant.PATH_VARIABLE_ID)
    public void delete(@PathVariable(value = Constant.PATH_VARIABLE_ID) long id) {
        dao.deleteById(id);
    }

    @GetMapping(value = Constant.PATH_VARIABLE_ID)
    public T get(@PathVariable(value = Constant.PATH_VARIABLE_ID) long id) {
        return dao.getOne(id);
    }
}