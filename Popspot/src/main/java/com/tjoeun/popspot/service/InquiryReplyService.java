package com.tjoeun.popspot.service;

import java.time.LocalDateTime;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tjoeun.popspot.domain.Inquiry;
import com.tjoeun.popspot.domain.InquiryReply;
import com.tjoeun.popspot.domain.dto.ApiResponse;

@Service
public class InquiryReplyService {
	@Autowired
	InquiryService is;
	
	@Autowired
	ReplyService rs;
	
	private static final String SUCCESS = "성공";
	private static final String FAIL = "실패";
//    private static final String NOT_FOUND = "조회실패";

	public ApiResponse getOneInquiry(Long no) {
		Inquiry i = is.getOneInquiry(no);
		if(i == null)
			return ApiResponse.apiBuilder(false, FAIL);
		
		InquiryReply ir = rs.getReply(no);
		
		HashMap<String, Object> result = new HashMap<>();
		result.put("inquiry", i);
		result.put("reply", ir);
		
		return ApiResponse.apiBuilder(true, SUCCESS, result);
	}

	public ApiResponse editInquiry(Long no, Inquiry editInquiry) {
		Inquiry i = is.getOneInquiry(no);
		if(i == null)
			return ApiResponse.apiBuilder(false, FAIL);
		
		InquiryReply ir = rs.getReply(no);
		if(ir != null)
			return ApiResponse.apiBuilder(false, FAIL);
		
		i.setInqTitle(editInquiry.getInqTitle());
		i.setInqContent(editInquiry.getInqContent());
		i.setType(editInquiry.getType());
		i.setSecret(editInquiry.getSecret());
		i.setModifiedDate(LocalDateTime.now());
		
		is.submit(i);
		
		return ApiResponse.apiBuilder(true, SUCCESS);
	}

	public ApiResponse deleteInquiry(Long no) {
		Inquiry i = is.getOneInquiry(no);
		if(i == null)
			return ApiResponse.apiBuilder(false, FAIL);
		
		i.setDeleted(true);
		i.setDeletedDate(LocalDateTime.now());
		
		is.submit(i);
		
		return ApiResponse.apiBuilder(true, SUCCESS);
	}
}