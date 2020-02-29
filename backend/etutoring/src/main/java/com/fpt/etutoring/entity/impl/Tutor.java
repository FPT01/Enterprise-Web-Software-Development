package com.fpt.etutoring.entity.impl;

import com.fpt.etutoring.entity.BaseEntity;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "tutor")
@Getter
@Setter
public class Tutor extends BaseEntity {

    @OneToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "allocate_id", referencedColumnName = "id")
    private Allocate allocate;

    @OneToMany(mappedBy = "tutor", cascade = CascadeType.REMOVE)
    private Set<Meeting> meetings = new HashSet<>(0);

}
