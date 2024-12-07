package com.tjoeun.popspot.repository;

import java.util.Map;
import java.util.Set;

public interface RedisRepository {
    Long incrementViewCount(String eventNo);
    Long getViewCount(String eventNo);
    Map<String, Long> getAllViewCounts();
    void deleteViewCount(String eventNo);
    Set<String> getAllKeys(); // 추가
}
