package com.tjoeun.popspot.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tjoeun.popspot.domain.LikeCount;
import com.tjoeun.popspot.domain.dto.ApiResponse;
import com.tjoeun.popspot.repository.LikeCountRepository;

import jakarta.transaction.Transactional;

@Service
public class LikeCountService {

	@Autowired
	LikeCountRepository lcr;

	private static final String SUCCESS = "성공";
	private static final String FAIL = "실패";
    private static final String NOT_FOUND = "조회실패";
    
    //해당 이벤트의 좋아요 수 가져오기
	public ApiResponse likeNo(Long eventNo) {
		Long no =lcr.likeNo(eventNo);
		return ApiResponse.apiBuilder(true, SUCCESS, no);
	}

	//특정 사용자가 특정 이벤트를 눌럿는지 체크 확인
	public ApiResponse likeget(Long eventNo, String userId) {
		boolean like =lcr.existsByIdEventNoAndIdUserId(eventNo,userId);
		if(like) {
			return ApiResponse.apiBuilder(true, SUCCESS,like);
		}else {
			return ApiResponse.apiBuilder(false, FAIL,like);
		}
		
	}
	
	//좋아요 생성 삭제
	@Transactional
	public ApiResponse likeCount(Long eventNo, String userId) {
		boolean like =lcr.existsByIdEventNoAndIdUserId(eventNo,userId);
		
		//if 문으로 값이 있으면 삭제 없으면 생성
		if(like) {
			
			lcr.deleteByIdEventNoAndIdUserId(eventNo,userId);
		}else {
			
			LikeCount.LikeCountId lcId = new LikeCount.LikeCountId();
			lcId.setEventNo(eventNo);
			lcId.setUserId(userId);
			
			LikeCount lc = new LikeCount();
			lc.setId(lcId);
			lcr.save(lc);
		}
		return ApiResponse.apiBuilder(true, SUCCESS);
	}
	
}
