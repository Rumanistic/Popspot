package com.tjoeun.popspot.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class ApiResponse {
	private final boolean success;
	private String message;
	private Object data;
    
	/**
	 * API 응답 객체를 생성하는 생성자
	 * @param state			&emsp;&emsp;&emsp;요청이 성공했는지, 실패했는지를 표현하는 논리값
	 * @param message		&emsp;&nbsp;요청에 대한 메시지 문자열
	 * @return <b>res</b>	&emsp;&emsp;&emsp;&emsp;API 응답 객체
	 */
    public static ApiResponse apiBuilder(boolean state, String message) {
    	return ApiResponse.builder()
    			.success(state)
    			.message(message)
    			.build();
    }
    
    /**
     * API 응답 객체를 생성하는 생성자
     * @param state			&emsp;&emsp;&emsp;요청이 성공했는지, 실패했는지를 표현하는 논리값
     * @param message		&emsp;&nbsp;요청에 대한 메시지 문자열
     * @param data			&emsp;&emsp;&emsp;&nbsp;응답 데이터
     * @return <b>res</b>	&emsp;&emsp;&emsp;&emsp;API 응답 객체
     */
    public static ApiResponse apiBuilder(boolean state, String message, Object data) {
    	return ApiResponse.builder()
    			.success(state)
    			.message(message)
    			.data(data)
    			.build();
    }
}
