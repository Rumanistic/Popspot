package com.tjoeun.popspot.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tjoeun.popspot.domain.Event;
import com.tjoeun.popspot.domain.Review;
import com.tjoeun.popspot.domain.dto.ApiResponse;
import com.tjoeun.popspot.domain.mapping.ReviewPoint;

@Service
public class EventReviewService {
	
	@Autowired
	EventService es;
	
	@Autowired
	ReviewService rs;
	
	private static final String SUCCESS = "성공";
//	private static final String FAIL = "실패";
    private static final String NOT_FOUND = "조회실패";
	
	public ApiResponse getAllList() {
		HashMap<String, Object> result = new HashMap<>();
		List<Event> eList = es.getAllList();
		
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
		
		return ApiResponse.apiBuilder(false, NOT_FOUND);
	}

	public ApiResponse searchListByTag(String tags) {
		String[] tagArr = tags.split(",");
		
		HashMap<String, Object> result = new HashMap<>();
		List<Event> eList = es.searchListByTag(tagArr);
		
		if(eList.size() > 0) {
			Set<Long> eListNos = new HashSet<Long>();
			for(Event e : eList) {
				eListNos.add(e.getEventNo());				
			}
			
			HashMap<Long, Double> rPoint = new HashMap<>();
			List<ReviewPoint> rPointsTaged = rs.getReviewPointAvg(eListNos);
			
			for(ReviewPoint rp : rPointsTaged) {
				rPoint.put(rp.getEventNo(), rp.getReviewPointAvg());
			}
			
			result.put("eList", eList);
			result.put("rPoint", rPoint);
			
			return ApiResponse.apiBuilder(true, SUCCESS, result);
		}
		
		return ApiResponse.apiBuilder(false, NOT_FOUND);
	}

	public ApiResponse getEvent(Long eventNo) {
		Event e = es.getEvent(eventNo);
		List<Review> r = rs.getReview(eventNo);
		
		HashMap<String, Object> result = new HashMap<>();
		
		result.put("event", e);
		result.put("review", r);
		
		return ApiResponse.apiBuilder(true, SUCCESS, result);
	}
	
	public ApiResponse searchListByKeyword(String keyword) {
	    HashMap<String, Object> result = new HashMap<>();
	    List<Event> eList = es.searchListByKeyword(keyword);
	    if (eList.size() > 0) {
	        // 검색된 이벤트의 eventNo만 추출
	        Set<Long> eventNos = new HashSet<>();
	        for (Event e : eList) {
	            eventNos.add(e.getEventNo());
	        }
	        System.out.println("추출한 eventNos : "+ eventNos);
	        // 검색된 이벤트의 eventNo를 기반으로 리뷰 포인트 가져오기
	        List<ReviewPoint> rPoints = rs.getReviewPointAvg(eventNos);
	        System.out.println("er리뷰포인트 확인 : "+rPoints);

	        // 리뷰 포인트를 HashMap으로 매핑
	        HashMap<Long, Double> rPoint = new HashMap<>();
	        for (ReviewPoint rp : rPoints) {
	            rPoint.put(rp.getEventNo(), rp.getReviewPointAvg());
	        }

	        result.put("eList", eList);   // 검색된 이벤트 리스트
	        result.put("rPoint", rPoint); // 해당 이벤트의 리뷰 포인트 매핑
	        return ApiResponse.apiBuilder(true, SUCCESS, result);
	    }
	    // 검색 결과가 없는 경우에도 빈 eList와 rPoint 반환
	    result.put("eList", new ArrayList<>()); // 빈 리스트
	    result.put("rPoint", new HashMap<>());  // 빈 매핑 객체
	    return ApiResponse.apiBuilder(true, NOT_FOUND, result);
	}
}
