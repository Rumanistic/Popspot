package com.tjoeun.popspot.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tjoeun.popspot.domain.InquiryReply;
import com.tjoeun.popspot.domain.dto.ApiResponse;
import com.tjoeun.popspot.repository.InquiryReplyRepository;

@Service
public class ReplyService {
	
	@Autowired
	InquiryReplyRepository irr;
	
	private static final String SUCCESS = "성공";
	private static final String FAIL = "실패";
    private static final String NOT_FOUND = "조회실패";
    
	public InquiryReply getReply(Long no) {
		return irr.findByInquiryNo(no).orElse(null);
	}

	public ApiResponse submit(Long no, InquiryReply ir) {
		// TODO Auto-generated method stub
		return null;
	}

}