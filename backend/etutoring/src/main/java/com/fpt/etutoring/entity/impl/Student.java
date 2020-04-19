package com.fpt.etutoring.entity.impl;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "student")
@Getter
@Setter
public class Student implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id", nullable = false, columnDefinition = "BIGINT")
    private  long id;

//    @ManyToOne(cascade = CascadeType.REMOVE)
//    @JoinColumn(name = "allocation_id", referencedColumnName = "id")
//    private Allocation allocation;

    @ManyToMany(mappedBy = "students", fetch = FetchType.LAZY)
    private Set<Meeting> meetings = new HashSet<>(0);

    @OneToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;
}
