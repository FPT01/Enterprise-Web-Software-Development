//package com.fpt.etutoring.entity.impl;
//
//import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
//import lombok.Getter;
//import lombok.Setter;
//
//import javax.persistence.*;
//import java.io.Serializable;
//import java.util.Date;
//
//@Entity
//@Table(name = "blog_comment")
//@Getter
//@Setter
//@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
//public class BlogComment implements Serializable {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Basic(optional = false)
//    @Column(name = "id", nullable = false, columnDefinition = "BIGINT")
//    private  long id;
//
//    @Column(name = "content")
//    private String content;
//
//    @Basic
//    @Temporal(TemporalType.TIMESTAMP)
//    @Column(name = "creation_time")
//    private Date creationTime;
//
//    @PrePersist
//    private void prePersist() {
//        creationTime = new Date();
//    }
//
//    @ManyToOne(cascade = CascadeType.REMOVE)
//    @JoinColumn(name = "user_id", referencedColumnName = "id")
//    private User user;
//
//    @ManyToOne(cascade = CascadeType.REMOVE)
//    @JoinColumn(name = "blog_post_id", referencedColumnName = "id")
//    private BlogPost blogPost;
//}
