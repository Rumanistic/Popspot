package com.tjoeun.popspot.service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tjoeun.popspot.domain.mapping.ReviewPoint;
import com.tjoeun.popspot.repository.ReviewRepository;

@Service
public class ReviewService {
	@Autowired
	ReviewRepository rr;
	
	private static final String SUCCESS = "성공";
	private static final String FAIL = "실패";
    private static final String NOT_FOUND = "조회실패";
	
    public List<ReviewPoint> getReviewPointAvg(){
    	return rr.findAllByDeleted(0);
    }
    
	public List<ReviewPoint> getReviewPointAvg(Set<Long> eNos) {
		Set<ReviewPoint> pointSet = new HashSet<>();
        for(Long eventNo : eNos) {
            pointSet.addAll(rr.findAllByEventNoAndDeleted(eventNo, 0));
        }
        
        return new ArrayList<>(pointSet);
	}

}
