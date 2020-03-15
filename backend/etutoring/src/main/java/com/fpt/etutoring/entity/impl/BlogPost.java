package com.fpt.etutoring.entity.impl;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

public class BlogPost implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id", nullable = false, columnDefinition = "BIGINT")
    private  long id;

    @Column(name = "title")
    private String title;

    @Column(name = "content")
    private String content;

    @Basic
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "creation_time")
    private Date creationTime;

    @Basic
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "modified_time")
    private Date modifiedTime;

    @PrePersist
    private void prePersist() {
        creationTime = new Date();
    }

    @PreUpdate
    private void preUpdate() {
        modifiedTime = new Date();
    }


    @ManyToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @OneToMany(mappedBy = "blogPost")
    private Set<BlogComment> blogComments = new HashSet<>(0);
}
