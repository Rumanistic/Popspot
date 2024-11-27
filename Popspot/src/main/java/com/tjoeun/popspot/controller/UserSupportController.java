package com.tjoeun.popspot.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.tjoeun.popspot.config.ResponseBuilder;
import com.tjoeun.popspot.domain.Inquiry;
import com.tjoeun.popspot.domain.InquiryReply;
import com.tjoeun.popspot.domain.dto.ApiResponse;
import com.tjoeun.popspot.service.InquiryReplyService;
import com.tjoeun.popspot.service.InquiryService;
import com.tjoeun.popspot.service.ReplyService;

@Controller
@RequestMapping("/api/support/user-support")
public class UserSupportController {
	@Autowired
	InquiryService is;
	
	@Autowired
	InquiryReplyService irs;
	
	@Autowired
	ReplyService rs;
	
	@Autowired
	ResponseBuilder rb;
	
	@GetMapping
	public ResponseEntity<ApiResponse> getAllInquiry() {
		ApiResponse res = is.getAllInquiry();
		
		return rb.buildResponse(res, HttpStatus.NOT_FOUND);
	}
	
	@GetMapping("/{no}")
	public ResponseEntity<ApiResponse> getOneInquiry(@PathVariable(name="no") Long no) {
		ApiResponse res = irs.getOneInquiry(no);
		
		return rb.buildResponse(res, HttpStatus.NOT_FOUND);
	}
	
	@PostMapping("/submit")
	public ResponseEntity<ApiResponse> submitInquiry(@RequestBody Inquiry i) {
		ApiResponse res = is.submit(i);
		
		return rb.buildCreatedResponse(res, HttpStatus.BAD_REQUEST);
	}
	
	@PostMapping("/{no}/reply")
	public ResponseEntity<ApiResponse> submitInquiryReply(
			@PathVariable(name="no") Long no,
			@RequestBody InquiryReply ir
		) {
		ApiResponse res = rs.submit(no, ir);
		
		return rb.buildCreatedResponse(res, HttpStatus.BAD_REQUEST);
	}
	
	@PutMapping("/{no}")
	public ResponseEntity<ApiResponse> editInquiry(
			@PathVariable(name="no") Long no,
			@RequestBody Inquiry editInquiry
		) {
		ApiResponse res = irs.editInquiry(no, editInquiry);
		
		return rb.buildNoContentResponse(res, HttpStatus.NOT_FOUND);
	}
	
	@DeleteMapping("/{no}")
	public ResponseEntity<ApiResponse> deleteInquiry(
			@PathVariable(name="no") Long no
		){
		ApiResponse res = irs.deleteInquiry(no);
		
		return rb.buildNoContentResponse(res, HttpStatus.NOT_FOUND);
	}
}
