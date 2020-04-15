//package com.fpt.etutoring.entity.impl;
//
//import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
//import lombok.EqualsAndHashCode;
//import lombok.Getter;
//import lombok.Setter;
//
//import javax.persistence.*;
//import java.io.Serializable;
//
//@Entity
//@Table(name = "notification")
//@Getter
//@Setter
//@EqualsAndHashCode
//@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
//public class Notification implements Serializable {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Basic(optional = false)
//    @Column(name = "id", nullable = false, columnDefinition = "BIGINT")
//    private  long id;
//
//    @Column(name = "description")
//    private String description;
//
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "user_id", referencedColumnName = "id")
//    private User user;
//
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "room_id", referencedColumnName = "id")
//    private Room room;
//}
