package com.tjoeun.popspot.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tjoeun.popspot.config.ResponseBuilder;
import com.tjoeun.popspot.domain.Faq;
import com.tjoeun.popspot.domain.dto.ApiResponse;
import com.tjoeun.popspot.service.FaqService;

@RestController
@RequestMapping("/api/support/faqs")
public class FaqController {
	@Autowired
	FaqService fs;
	
	@Autowired
    ResponseBuilder rb;
	
	@GetMapping
	public ResponseEntity<Object> getAllFaqs() {
		ApiResponse res = fs.getAllFaqs();
		
		return rb.buildResponse(res, HttpStatus.NO_CONTENT);
	}
	
	@PostMapping("/submit")
	public ResponseEntity<ApiResponse> submitFaq(@RequestBody Faq f) {
		ApiResponse res = fs.submitFaq(f);
		
		return rb.buildCreatedResponse(res, HttpStatus.NO_CONTENT);
	}
	
	@PutMapping("/{no}")
	public ResponseEntity<ApiResponse> editFaq(
			@PathVariable(name="no") Long no,
			@RequestBody Faq faq
		) {
		ApiResponse res = fs.editFaq(no, faq);
		
		return rb.buildNoContentResponse(res, HttpStatus.NOT_FOUND);
	}
	
	@DeleteMapping("/{no}")
	public ResponseEntity<ApiResponse> deleteFaq(
			@PathVariable(name="no") Long no
		) {
		ApiResponse res = fs.deleteFaq(no);
		
		return rb.buildNoContentResponse(res, HttpStatus.NOT_FOUND);
	}
}
