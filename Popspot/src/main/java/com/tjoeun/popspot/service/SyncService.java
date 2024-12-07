package com.tjoeun.popspot.service;

import com.tjoeun.popspot.domain.Views;
import com.tjoeun.popspot.domain.Views.ViewsId;
import com.tjoeun.popspot.repository.ViewsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Map;

@Service
public class SyncService {

    private final HashOperations<String, String, String> hashOperations;
    private static final String REDIS_HASH_KEY = "view";

    @Autowired
    public SyncService(RedisTemplate<String, String> redisTemplate) {
        this.hashOperations = redisTemplate.opsForHash();
    }
    
    @Autowired
    ViewsRepository viewsRepository;

    public void syncViewsToDatabase() {
        // Redis에서 모든 조회수 데이터 가져오기
        Map<String, String> viewCounts = hashOperations.entries(REDIS_HASH_KEY);

        // 데이터가 없는 경우 로그 출력 후 종료
        if (viewCounts == null || viewCounts.isEmpty()) {
            System.out.println("Redis에 데이터가 없습니다. 키: " + REDIS_HASH_KEY);
            return;
        }

        System.out.println("Redis에서 가져온 데이터: " + viewCounts);
        // 현재 시간의 날짜와 시간을 YYYYMMDDhh 형식으로 생성
        String currentHour = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHH"));

        // 데이터 처리 (예: DB 저장)
        for (Map.Entry<String, String> entry : viewCounts.entrySet()) {
            String eventNo = entry.getKey();
            int viewCount = Integer.parseInt(entry.getValue());
            
            System.out.println("eventNo : " + eventNo + " viewCount : " + viewCount);
            
            // 복합 키 생성
            ViewsId ViewsId = new ViewsId();
            ViewsId.setViewDate(currentHour);
            ViewsId.setEventNo( Long.parseLong(eventNo));
            
            
            // Views 엔티티 생성 및 데이터 설정
			Views views = new Views();
			views.setViewsId(ViewsId);
			views.setVIEWCOUNT(viewCount);
			// DB에 저장
			viewsRepository.save(views);
			
			// 데이터 처리 로직 추가
			System.out.println("Event ID: " + eventNo + ", View Count: " + viewCount);

  
        
          
        }
    }
}
