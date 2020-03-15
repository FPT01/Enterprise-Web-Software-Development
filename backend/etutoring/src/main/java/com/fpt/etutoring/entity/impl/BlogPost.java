//package com.fpt.etutoring.entity.impl;
//
//import javax.persistence.CascadeType;
//import javax.persistence.JoinColumn;
//import javax.persistence.ManyToOne;
//import javax.persistence.OneToMany;
//import java.io.Serializable;
//import java.util.HashSet;
//import java.util.Set;
//
//public class BlogPost implements Serializable {
//
//
//    @ManyToOne(cascade = CascadeType.REMOVE)
//    @JoinColumn(name = "user_id", referencedColumnName = "id")
//    private User user;
//
//    @OneToMany(mappedBy = "user")
//    private Set<BlogComment> blogComments = new HashSet<>(0);
//}
