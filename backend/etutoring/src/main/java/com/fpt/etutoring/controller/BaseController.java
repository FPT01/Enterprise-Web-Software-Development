package com.fpt.etutoring.controller;

import java.util.List;

public interface BaseController<T, V> {
    List<T> list();
    T createOrUpdate(T json);
    void delete(V id);
    T findById(V id);
}
