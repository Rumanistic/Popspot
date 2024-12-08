package com.tjoeun.popspot.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponse {
	private String userId;
	private String userPwd;
	private String email;
	private String phone;
	private String name;
	private int type;
}
