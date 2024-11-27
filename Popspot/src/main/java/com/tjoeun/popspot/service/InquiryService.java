package com.tjoeun.popspot.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tjoeun.popspot.domain.Inquiry;
import com.tjoeun.popspot.domain.dto.ApiResponse;
import com.tjoeun.popspot.repository.InquiryRepository;

@Service
public class InquiryService {
	
	@Autowired
	InquiryRepository ir;
	
	private static final String SUCCESS = "성공";
	private static final String FAIL = "실패";
    private static final String NOT_FOUND = "조회실패";
    
	public ApiResponse getAllInquiry() {
		List<Inquiry> sList = ir.findAllByDeleted(false);
		
		return ApiResponse.apiBuilder(true, SUCCESS, sList);
	}
	
	public Inquiry getOneInquiry(Long no) {
		return ir.findById(no).orElse(null);
	}

	public ApiResponse submit(Inquiry i) {
		ir.save(i);
		
		return ApiResponse.apiBuilder(true, SUCCESS);
	}
}