package com.tjoeun.popspot.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

/**
 * RedisRepositoryImpl - Redis에서 조회수 데이터를 관리하는 구현체.
 * Hash 자료구조를 활용하여 이벤트별 조회수를 저장, 업데이트, 조회, 삭제를 수행.
 */
@Repository
public class RedisRepositoryImpl implements RedisRepository {

    // Redis HashOperations 객체. Hash 자료구조의 조작을 담당.
    private final HashOperations<String, String, String> hashOperations;

    // Redis에서 조회수를 저장할 Hash의 Key 이름
    private static final String HASH_KEY = "view";

    /**
     * RedisRepositoryImpl 생성자.
     * RedisTemplate을 통해 HashOperations를 초기화.
     *
     * @param redisTemplate RedisTemplate 인스턴스
     */
    @Autowired
    public RedisRepositoryImpl(RedisTemplate<String, String> redisTemplate) {
        this.hashOperations = redisTemplate.opsForHash();
    }

    /**
     * 특정 이벤트의 조회수를 1 증가시킴.
     *
     * @param eventNo 이벤트 번호
     * @return 증가된 조회수 값
     */
    @Override
    public Long incrementViewCount(String eventNo) {
        return hashOperations.increment(HASH_KEY, eventNo, 1);
    }

    /**
     * 특정 이벤트의 조회수를 반환.
     *
     * @param eventNo 이벤트 번호
     * @return 현재 조회수 값 (없을 경우 0 반환)
     */
    @Override
    public Long getViewCount(String eventNo) {
        String count = hashOperations.get(HASH_KEY, eventNo);
        return count != null ? Long.parseLong(count) : 0L; // 조회수가 없으면 기본값 0 반환
    }

    /**
     * 모든 이벤트의 조회수를 반환.
     *
     * @return 이벤트 ID와 조회수의 맵
     */
    @Override
    public Map<String, Long> getAllViewCounts() {
        // Redis에서 모든 Hash 엔트리를 가져옴
        Map<String, String> entries = hashOperations.entries(HASH_KEY);

        // String 값들을 Long으로 변환하여 새로운 맵에 저장
        Map<String, Long> result = new HashMap<>();
        entries.forEach((key, value) -> result.put(key, Long.parseLong(value)));
        return result;
    }

    /**
     * 특정 이벤트의 조회수를 삭제.
     *
     * @param eventNo 이벤트 번호
     */
    @Override
    public void deleteViewCount(String eventNo) {
        hashOperations.delete(HASH_KEY, eventNo);
    }

    /**
     * 조회수 Hash에 저장된 모든 이벤트 ID(Key)를 반환.
     *
     * @return 이벤트 ID의 집합(Set)
     */
    @Override
    public Set<String> getAllKeys() {
        return hashOperations.keys(HASH_KEY); // 모든 Key를 반환
    }
    
}
