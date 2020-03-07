package com.fpt.etutoring.entity.impl;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "meeting")
@Getter
@Setter
@EqualsAndHashCode
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Meeting implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id", nullable = false, columnDefinition = "BIGINT")
    private  long id;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @Basic
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "creation_time")
    private Date creationTime;

    @Basic
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "modified_time")
    private Date modifiedTime;

    @ManyToMany
    @JoinTable(name = "meeting_guest",
    joinColumns = @JoinColumn(name = "meeting_id"),
    inverseJoinColumns = @JoinColumn(name = "user_id"))
    @JsonIgnore
    private Set<User> users = new HashSet<>(0);

    @PrePersist
    private void prePersist() {
        creationTime = new Date();
    }

    @PreUpdate
    private void preUpdate() {
        modifiedTime = new Date();
    }
}
