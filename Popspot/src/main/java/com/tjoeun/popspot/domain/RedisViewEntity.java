//package com.tjoeun.popspot.domain;
//
//import org.springframework.data.annotation.Id;
//import org.springframework.data.redis.core.RedisHash;
//
//@RedisHash("views") // Redis에서 사용할 해시 이름
//public class RedisViewEntity {
//
//    @Id
//    private String eventNo; // Redis에서 사용할 ID
//
//    private Integer viewCount;
//
//    // 기본 생성자
//    public RedisViewEntity() {}
//
//    // 생성자
//    public RedisViewEntity(String eventNo, Integer viewCount) {
//        this.eventNo = eventNo;
//        this.viewCount = viewCount;
//    }
//
//    // Getter 및 Setter
//    public String getEventNo() {
//        return eventNo;
//    }
//
//    public void setEventNo(String eventNo) {
//        this.eventNo = eventNo;
//    }
//
//    public Integer getViewCount() {
//        return viewCount;
//    }
//
//    public void setViewCount(Integer viewCount) {
//        this.viewCount = viewCount;
//    }
//}
