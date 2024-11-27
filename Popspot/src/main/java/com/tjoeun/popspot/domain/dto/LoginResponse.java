package com.tjoeun.popspot.domain.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class LoginResponse {
	private String userId;
	private String userPwd;
	private String email;
	private String phone;
	private String name;
	private int type;
}
