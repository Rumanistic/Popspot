package com.tjoeun.popspot.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public class RedisRepositoryImpl implements RedisRepository {

    private static final String REDIS_SORTED_SET_KEY = "view";
    private final ZSetOperations<String, String> zSetOperations;

    @Autowired
    public RedisRepositoryImpl(RedisTemplate<String, String> redisTemplate) {
        this.zSetOperations = redisTemplate.opsForZSet();
    }

    @Override
    public Double incrementViewCount(String eventNo) {
        // 조회수 증가
        return zSetOperations.incrementScore(REDIS_SORTED_SET_KEY, eventNo, 1);
    }

    @Override
    public Double getViewCount(String eventNo) {
        // 특정 ID의 조회수 가져오기
        return zSetOperations.score(REDIS_SORTED_SET_KEY, eventNo);
    }

    @Override
    public Set<String> getTopNKeys(int n) {
        // 상위 N개의 인기 ID 가져오기 (내림차순)
        return zSetOperations.reverseRange(REDIS_SORTED_SET_KEY, 0, n - 1);
    }

    @Override
    public void deleteViewCount(String eventNo) {
        // 특정 ID 삭제
        zSetOperations.remove(REDIS_SORTED_SET_KEY, eventNo);
    }
}
