package com.tjoeun.popspot.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tjoeun.popspot.config.ResponseBuilder;
import com.tjoeun.popspot.domain.Users;
import com.tjoeun.popspot.domain.dto.ApiResponse;
import com.tjoeun.popspot.domain.dto.LoginRequest;
import com.tjoeun.popspot.service.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {
	@Autowired
	UserService us;
	
	@Autowired
    ResponseBuilder rb;
	
	/***
	 * 컨트롤러에서 HTTP 요청 리턴 
	 * @param res
	 * @param defaultStatus
	 * @return
	 */	
	@PostMapping("/signup")
	public ResponseEntity<ApiResponse> signUp(@RequestBody Users user) {
		ApiResponse res = us.setUser(user);
		
		return rb.buildResponse(res, HttpStatus.BAD_REQUEST);
	}
	
	@PostMapping("/check/{userId}")
	public ResponseEntity<ApiResponse> checkUsername(@PathVariable(name="userId") String userId) {
		ApiResponse res = us.checkDuplicatedId(userId);
		
		return rb.buildResponse(res, HttpStatus.CONFLICT);
	}
	
	@PostMapping("/login")
	public ResponseEntity<ApiResponse> login(@RequestBody Users user) {
		ApiResponse res = us.loginUser(user);
	    
		return rb.buildResponse(res, HttpStatus.UNAUTHORIZED);
	}
	
	@PostMapping("/find-id")
	public ResponseEntity<ApiResponse> findId(@RequestBody LoginRequest lr){
		ApiResponse res = us.findId(lr);
		
		return rb.buildResponse(res, HttpStatus.NOT_FOUND);
	}
	
	@PostMapping("/find-password")
	public ResponseEntity<ApiResponse> findPassword(@RequestBody LoginRequest lr){
		ApiResponse res = us.findPassword(lr);
		
		return rb.buildResponse(res, HttpStatus.NOT_FOUND);
	}
	
	@PostMapping("/change-password")
	public ResponseEntity<ApiResponse> changePassword(@RequestBody LoginRequest lr){
		ApiResponse res = us.changePassword(lr);
		
		return rb.buildResponse(res, HttpStatus.BAD_REQUEST);
	}
	
	@PostMapping("/withdraw")
	public ResponseEntity<ApiResponse> withdraw(@RequestBody Users user){
		ApiResponse res = us.deleteUser(user);
		
		return rb.buildResponse(res, HttpStatus.BAD_REQUEST);
	}
	
	@PostMapping("/verify-password")
	public ResponseEntity<ApiResponse> verifyPassword(@RequestBody LoginRequest lr){
		ApiResponse res = us.verifyPassword(lr);
		
		return rb.buildResponse(res, HttpStatus.UNAUTHORIZED);
	}
	
	@PostMapping("/update-info")
	public ResponseEntity<ApiResponse> updateUserInfo(@RequestBody Users user){
		ApiResponse res = us.updateUserInfo(user);
		
		return rb.buildResponse(res, HttpStatus.BAD_REQUEST);
	}
}
