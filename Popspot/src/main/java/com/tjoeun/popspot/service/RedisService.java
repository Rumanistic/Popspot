package com.tjoeun.popspot.service;

import com.tjoeun.popspot.domain.Event;
import com.tjoeun.popspot.domain.dto.ApiResponse;
import com.tjoeun.popspot.domain.mapping.ReviewPoint;
import com.tjoeun.popspot.repository.EventRepository;
import com.tjoeun.popspot.repository.RedisRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

@Service
public class RedisService {

    private final RedisRepository redisRepository;
    private static final String SUCCESS = "성공";
    
	@Autowired
	EventRepository es;
	
	@Autowired
	ReviewService rs;

    @Autowired
    public RedisService(RedisRepository redisRepository) {
        this.redisRepository = redisRepository;
    }

    // 조회수 증가
    public ApiResponse incrementViewCount(String eventNo) {
    	
        try {
            Double newCount = redisRepository.incrementViewCount(eventNo);
            int intCount = (newCount != null) ? newCount.intValue() : 0; // null인 경우 0으로 처리
            return ApiResponse.apiBuilder(true, "조회수 증가 성공", intCount);
        } catch (Exception e) {
            System.err.println("RedisService Error (incrementViewCount): " + e.getMessage());
            return ApiResponse.apiBuilder(false, "조회수 증가 실패");
        }
    }

 // 조회수 조회
    public ApiResponse getViewCount(String eventNo) {
        try {
            // Double 값을 반환받아 int로 변환
            Double count = redisRepository.getViewCount(eventNo);
            int intCount = (count != null) ? count.intValue() : 0; // null인 경우 0으로 처리
            return ApiResponse.apiBuilder(true, "조회수 반환 성공", intCount);
        } catch (Exception e) {
            System.err.println("RedisService Error (getViewCount): " + e.getMessage());
            return ApiResponse.apiBuilder(false, "조회수 반환 실패");
        }
    }

    // 상위 N개의 인기 조회수 반환
    public ApiResponse getTopNKeys(int n) {
        try {
            Set<String> topKeys = redisRepository.getTopNKeys(n);
            List<String> topKeysList = new ArrayList<>(topKeys);
            System.out.println("상위권 이벤트 NO : " + topKeysList);
            List<Event> eList = new ArrayList<>();
            HashMap<String, Object> result = new HashMap<>();
            
            // 상위권 리스트 만들기 
            for(String eventNo :topKeysList) {
            	Event res = es.findByEventNo(Long.parseLong(eventNo));
            	if(res != null) {
            		eList.add(res);
            	}
            
            }
            if(eList.size() > 0) {
    			HashMap<Long, Double> rPoint = new HashMap<>();
    			List<ReviewPoint> rPoints = rs.getReviewPointAvg();
    			
    			for(ReviewPoint rp : rPoints) {
    				rPoint.put(rp.getEventNo(), rp.getReviewPointAvg());
    			}
    			
    			result.put("eList", eList);
    			result.put("rPoint", rPoint);
    			
    			return ApiResponse.apiBuilder(true, SUCCESS, result);
    		}
            
            
            
            System.out.println(" result : " + result);
            
            return ApiResponse.apiBuilder(true, "상위 조회수 반환 성공", result);
        } catch (Exception e) {
            System.err.println("RedisService Error (getTopNKeys): " + e.getMessage());
            return ApiResponse.apiBuilder(false, "상위 조회수 반환 실패");
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
}
