package com.tjoeun.popspot.repository;

import java.util.Set;

public interface RedisRepository {

    // 조회수 증가
    Double incrementViewCount(String eventNo);

    // 특정 ID 조회수 조회
    Double getViewCount(String eventNo);

    // 상위 N개의 조회수 반환
    Set<String> getTopNKeys(int n);

    // 조회수 삭제
    void deleteViewCount(String eventNo);
}
