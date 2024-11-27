package com.tjoeun.popspot.config;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import com.tjoeun.popspot.domain.dto.ApiResponse;

@Component
public class ResponseBuilder {
	/**
	 * ** 200 OK **<br>
	 * API Request에 대한 응답으로 ApiResponse 객체를 기반으로<br>
	 * HTTP 응답 코드와 함께 ResponseEntity를 생성
	 * @param res 			성공 여부, 메시지, 데이터를 포함하는 ApiResponse 객체<br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{success, message, data}
	 * @param defaultStatus 실패 시 반환할 기본 HTTP 상태 코드
	 * @return {200 OK 확인 [데이터 필드 있음] | defaultStatus 에러 리턴값}
	 */
	public ResponseEntity<ApiResponse> buildResponse(ApiResponse res, HttpStatus defaultStatus){
		HttpStatus stat = res.isSuccess() ? HttpStatus.OK : defaultStatus;
		return ResponseEntity.status(stat).body(res);
	}
	
	/**
	 * ** 201 CREATED **<br>
	 * API Request에 대한 응답으로 ApiResponse 객체를 기반으로<br>
	 * HTTP 응답 코드와 함께 ResponseEntity를 생성
	 * @param res 			성공 여부, 메시지, 데이터를 포함하는 ApiResponse 객체<br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{success, message}
	 * @param defaultStatus 실패 시 반환할 기본 HTTP 상태 코드
	 * @return {201 CREATED 생성됨 | defaultStatus 에러 리턴값}
	 */
	public ResponseEntity<ApiResponse> buildCreatedResponse(ApiResponse res, HttpStatus defaultStatus){
		HttpStatus stat = res.isSuccess() ? HttpStatus.CREATED : defaultStatus;
		return ResponseEntity.status(stat).body(res);
	}
	
	/**
	 * ** 204 NO_CONTENT **<br>
	 * API Request에 대한 응답으로 ApiResponse 객체를 기반으로<br>
	 * HTTP 응답 코드와 함께 ResponseEntity를 생성
	 * @param res 			성공 여부, 메시지, 데이터를 포함하는 ApiResponse 객체<br> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{success, message}
	 * @param defaultStatus 실패 시 반환할 기본 HTTP 상태 코드
	 * @return {204 NO_CONTENT 반환할 데이터 없음 | defaultStatus 에러 리턴값}
	 */
	public ResponseEntity<ApiResponse> buildNoContentResponse(ApiResponse res, HttpStatus defaultStatus){
		HttpStatus stat = res.isSuccess() ? HttpStatus.NO_CONTENT : defaultStatus;
		return ResponseEntity.status(stat).body(res);
	}
}
