package com.tjoeun.popspot.service;

import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tjoeun.popspot.domain.Event;
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
}
