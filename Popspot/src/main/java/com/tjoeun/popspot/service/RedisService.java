package com.tjoeun.popspot.service;

import com.tjoeun.popspot.domain.dto.ApiResponse;
import com.tjoeun.popspot.repository.RedisRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Set;

@Service
public class RedisService {

    private final RedisRepository redisRepository;

    @Autowired
    public RedisService(RedisRepository redisRepository) {
        this.redisRepository = redisRepository;
    }

    // 조회수 증가
    public ApiResponse incrementViewCount(String eventNo) {
        try {
            Long newCount = redisRepository.incrementViewCount(eventNo);
            return ApiResponse.apiBuilder(true, "조회수 증가 성공", newCount);
        } catch (Exception e) {
            System.err.println("RedisService Error (incrementViewCount): " + e.getMessage());
            return ApiResponse.apiBuilder(false, "조회수 증가 실패");
        }
    }

    // 조회수 조회
    public ApiResponse getViewCount(String eventNo) {
        try {
            Long count = redisRepository.getViewCount(eventNo);
            return ApiResponse.apiBuilder(true, "조회수 반환 성공", count);
        } catch (Exception e) {
            System.err.println("RedisService Error (getViewCount): " + e.getMessage());
            return ApiResponse.apiBuilder(false, "조회수 반환 실패");
        }
    }

    // 모든 조회수 반환
    public ApiResponse getAllViewCounts() {
        try {
            Map<String, Long> allCounts = redisRepository.getAllViewCounts();
            return ApiResponse.apiBuilder(true, "모든 조회수 반환 성공", allCounts);
        } catch (Exception e) {
            System.err.println("RedisService Error (getAllViewCounts): " + e.getMessage());
            return ApiResponse.apiBuilder(false, "모든 조회수 반환 실패");
        }
    }

    // 조회수 삭제
    public ApiResponse deleteViewCount(String eventNo) {
        try {
            redisRepository.deleteViewCount(eventNo);
            return ApiResponse.apiBuilder(true, "조회수 삭제 성공");
        } catch (Exception e) {
            System.err.println("RedisService Error (deleteViewCount): " + e.getMessage());
            return ApiResponse.apiBuilder(false, "조회수 삭제 실패");
        }
    }

    // 모든 조회수의 키만 반환
    public ApiResponse getAllKeys() {
        try {
            // 모든 키 가져오기
            Set<String> keys = redisRepository.getAllKeys();
            return ApiResponse.apiBuilder(true, "모든 조회수 키 반환 성공", keys);
        } catch (Exception e) {
            System.err.println("RedisService Error (getAllKeys): " + e.getMessage());
            return ApiResponse.apiBuilder(false, "모든 조회수 키 반환 실패");
        }
    }
    
    
    
}
