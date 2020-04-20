package com.fpt.etutoring.dao.impl;

import com.fpt.etutoring.entity.impl.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;

@Repository
public interface MessageDao extends JpaRepository<Message, Long> {

    @Query("SELECT count(m) FROM Message m WHERE m.time >= :time")
    Long getMessagesLastSevenDays(@Param("time") Date time);

//    @Query("SELECT m FROM Message m " +
//            "WHERE m.sender.role.roleName = :roleName " +
//            "OR m.receiver.role.roleName = :roleName")
//    List<Message> getMessageByRoleName(@Param("roleName") String roleName);

//    @Query("SELECT count(m) FROM Message m WHERE m.user.id = :userId")
//    Long getTotalMessageByUserId(@Param("userId") Long userId);

}
