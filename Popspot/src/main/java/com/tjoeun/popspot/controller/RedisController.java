package com.tjoeun.popspot.controller;

import com.tjoeun.popspot.config.ResponseBuilder;
import com.tjoeun.popspot.domain.dto.ApiResponse;
import com.tjoeun.popspot.service.RedisService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/redis")
public class RedisController {

    private final RedisService redisService;
    
    @Autowired
    ResponseBuilder rb;

    @Autowired
    public RedisController(RedisService redisService) {
        this.redisService = redisService;
    }

    @GetMapping("views/{eventNo}/increment")
    public ApiResponse  incrementViewCount(@PathVariable("eventNo") String eventNo) {
        return redisService.incrementViewCount(eventNo);
    }

    @GetMapping("/{eventNo}")
    public ApiResponse getViewCount(@PathVariable("eventNo") String eventNo) {
        return redisService.getViewCount(eventNo);
    }

    @GetMapping("views/top/{number}")
    public ResponseEntity<Object> getTopKeys(@PathVariable("number") int number) {
    	ApiResponse res = redisService.getTopNKeys(number);
        return rb.buildResponse( res, HttpStatus.NOT_FOUND);
    }

    // 삭제부분은 위험하니까 주석처리 
//    @DeleteMapping("/{eventNo}")
//    public ApiResponse deleteViewCount(@PathVariable("eventNo") String eventNo) {
//        return redisService.deleteViewCount(eventNo);
//    }
    
    
    
}