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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tjoeun.popspot.config.ResponseBuilder;
import com.tjoeun.popspot.domain.Event;
import com.tjoeun.popspot.domain.dto.ApiResponse;
import com.tjoeun.popspot.service.EventReviewService;
import com.tjoeun.popspot.service.EventService;
import com.tjoeun.popspot.service.ReviewService;

@RestController
@RequestMapping("/api/event")
public class EventController {
	@Autowired
	EventService es;
	
	@Autowired
	ReviewService rs;
	
	@Autowired
	EventReviewService ers;
	
	@Autowired
    ResponseBuilder rb;
	
	@GetMapping("/lists")
	public ResponseEntity<ApiResponse> getAllList() {
		ApiResponse res = ers.getAllList();
		
		return rb.buildResponse(res, HttpStatus.NOT_FOUND);
	}
	
	@PostMapping("/submit")
	public ResponseEntity<ApiResponse> submitEvent(@RequestBody Event e) throws Exception {
		ApiResponse res = es.submitEvent(e);
		
		return rb.buildResponse(res, HttpStatus.BAD_REQUEST);
	}
	
	@GetMapping("/tags")
	public ResponseEntity<ApiResponse> getAllTags() {
		ApiResponse res = es.getAllTags();
		
		return rb.buildResponse(res, HttpStatus.NOT_FOUND);
	}
	
	@GetMapping("/search/tags")
	public ResponseEntity<ApiResponse> searchListByTag(@RequestParam(name="tags") String tags) {
		ApiResponse res = ers.searchListByTag(tags);
		
		return rb.buildResponse(res, HttpStatus.NOT_FOUND);
	}
	
	@GetMapping("/{no}")
	public ResponseEntity<ApiResponse> getEvent(@PathVariable(name="no") Long eventNo) {
		ApiResponse res = es.getEvent(eventNo);
		
		return rb.buildResponse(res, HttpStatus.NOT_FOUND);
	}
	
	@PutMapping("/{no}")
	public ResponseEntity<ApiResponse> editEvent(
			@PathVariable(name="no") Long eventNo,
			@RequestBody Event e
		) throws Exception {
		ApiResponse res = es.editEvent(e);
		
		return rb.buildResponse(res, HttpStatus.BAD_REQUEST);
	}
	
	@DeleteMapping("/{no}")
	public ResponseEntity<ApiResponse> deleteEvent(
			@PathVariable(name="no") Long eventNo
		) throws Exception {
		ApiResponse res = es.deleteEvent(eventNo);
		
		return rb.buildResponse(res, HttpStatus.BAD_REQUEST);
	}
	
	@GetMapping("/recent-events")
	public ResponseEntity<ApiResponse> getRecentEvents() {
		ApiResponse res = es.getRecentEvents();
		
		return rb.buildResponse(res, HttpStatus.NOT_FOUND);
	}
}
