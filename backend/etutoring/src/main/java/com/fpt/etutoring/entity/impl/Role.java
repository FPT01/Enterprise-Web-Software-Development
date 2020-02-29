package com.fpt.etutoring.entity.impl;

import com.fpt.etutoring.entity.BaseEntity;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "role")
@Getter
@Setter
public class Role extends BaseEntity {
    @Column(name = "role_name")
    private String roleName;

    @Column(name = "role_desc")
    private String roleDescription;

    @OneToMany(mappedBy = "role", cascade = CascadeType.REMOVE)
    private Set<User> users = new HashSet<>(0);
}
