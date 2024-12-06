package com.tjoeun.popspot.controller;

import com.tjoeun.popspot.domain.dto.ApiResponse;
import com.tjoeun.popspot.service.RedisService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/views")
public class RedisController {

    private final RedisService redisService;

    @Autowired
    public RedisController(RedisService redisService) {
        this.redisService = redisService;
    }

    @GetMapping("/{eventNo}/increment")
    public ApiResponse incrementViewCount(@PathVariable("eventNo") String eventNo) {
        return redisService.incrementViewCount(eventNo);
    }

    @GetMapping("/{eventNo}")
    public ApiResponse getViewCount(@PathVariable("eventNo") String eventNo) {
        return redisService.getViewCount(eventNo);
    }

    @GetMapping("/all")
    public ApiResponse getAllKeys() {
        return redisService.getAllKeys();
    }

    @DeleteMapping("/{eventNo}")
    public ApiResponse deleteViewCount(@PathVariable("eventNo") String eventNo) {
        return redisService.deleteViewCount(eventNo);
    }
    
    
    
}