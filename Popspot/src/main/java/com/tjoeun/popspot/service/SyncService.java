package com.tjoeun.popspot.service;

import com.tjoeun.popspot.domain.Views;
import com.tjoeun.popspot.domain.Views.ViewsId;
import com.tjoeun.popspot.repository.ViewsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Set;

@Service
public class SyncService {

    private final ZSetOperations<String, String> zSetOperations;
    private static final String REDIS_SORTED_SET_KEY = "view"; // 기존 이름

    @Autowired
    public SyncService(RedisTemplate<String, String> redisTemplate) {
        this.zSetOperations = redisTemplate.opsForZSet();
    }

    @Autowired
    private ViewsRepository viewsRepository;

    public void syncViewsToDatabase() {
        // Redis에서 모든 조회수 데이터 가져오기
        Set<ZSetOperations.TypedTuple<String>> viewCounts = zSetOperations.reverseRangeWithScores(REDIS_SORTED_SET_KEY, 0, -1);

        // 데이터가 없는 경우 로그 출력 후 종료
        if (viewCounts == null || viewCounts.isEmpty()) {
            System.out.println("Redis에 데이터가 없습니다. 키: " + REDIS_SORTED_SET_KEY);
            return;
        }

        System.out.println("Redis에서 가져온 데이터: " + viewCounts);

        // 현재 시간의 날짜와 시간을 YYYYMMDDhh 형식으로 생성
        String currentHour = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHH"));

        // Redis 데이터 처리 및 DB 저장
        for (ZSetOperations.TypedTuple<String> entry : viewCounts) {
            String eventNo = entry.getValue();
            int viewCount = entry.getScore() != null ? entry.getScore().intValue() : 0;

            System.out.println("EventNo: " + eventNo + ", ViewCount: " + viewCount);

            // 복합 키 생성
            ViewsId viewsId = new ViewsId();
            viewsId.setViewDate(currentHour);
            viewsId.setEventNo(Long.parseLong(eventNo));

            // Views 엔티티 생성 및 데이터 설정
            Views views = new Views();
            views.setViewsId(viewsId);
            views.setVIEWCOUNT(viewCount);

            // DB에 저장
            viewsRepository.save(views);

            // 처리 로그
            System.out.println("DB 저장 완료 - Event ID: " + eventNo + ", View Count: " + viewCount);
        }
    }
}
