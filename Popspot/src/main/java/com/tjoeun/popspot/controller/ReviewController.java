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
import com.tjoeun.popspot.domain.Review;
import com.tjoeun.popspot.domain.dto.ApiResponse;
import com.tjoeun.popspot.service.ReviewService;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {
	@Autowired
	ReviewService rs;
	
	@Autowired
	ResponseBuilder rb;
	
	@GetMapping("/{no}")
	ResponseEntity<Object> getReviewsByEventNo(@PathVariable(name="no") Long no) {
		ApiResponse res = rs.getReviewFromRc(no); 
				
		return rb.buildResponse(res, HttpStatus.NOT_FOUND);
	}
	
	@PostMapping("/submit")
	ResponseEntity<ApiResponse> submitReview(@RequestBody Review r) {
		ApiResponse res = rs.submit(r);
		
		return rb.buildCreatedResponse(res, HttpStatus.BAD_REQUEST);
	}
	
	@PutMapping("/{no}")
	ResponseEntity<Object> editReview(
			@PathVariable(name="no") Long no,
			@RequestBody Review r
		) {
		ApiResponse res = rs.editReview(no, r);
		
		return rb.buildResponse(res, HttpStatus.BAD_REQUEST);
	}
	
	@DeleteMapping("/{no}")
	ResponseEntity<ApiResponse> deleteReview(@PathVariable(name="no") Long no) {
		ApiResponse res = rs.deleteReviwe(no);
		
		return rb.buildNoContentResponse(res, HttpStatus.NOT_FOUND);
	}
}
