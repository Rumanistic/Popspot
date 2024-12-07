package com.tjoeun.popspot.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.tjoeun.popspot.service.SyncService;


@Component
public class SyncScheduler {

    private final SyncService syncService;

    @Autowired
    public SyncScheduler(SyncService syncService) {
        this.syncService = syncService;
    }

    // 매 정각마다 실행
    @Scheduled(cron = "0 0 * * * *")
    public void syncRedisToDatabase() {
        syncService.syncViewsToDatabase();
        System.out.println("스케줄러 실행: Redis 데이터를 Oracle DB로 동기화했습니다.");
    }
    
}