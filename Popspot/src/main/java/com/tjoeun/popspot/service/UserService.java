package com.tjoeun.popspot.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.tjoeun.popspot.domain.Users;
import com.tjoeun.popspot.domain.dto.ApiResponse;
import com.tjoeun.popspot.domain.dto.LoginRequest;
import com.tjoeun.popspot.domain.dto.LoginResponse;
import com.tjoeun.popspot.repository.UserRepository;

@Service
public class UserService {
	@Autowired
	PasswordEncoder pe;
	
	@Autowired
	UserRepository ur;
	
	private static final String SUCCESS = "성공";
	private static final String FAIL = "실패";
    private static final String NOT_FOUND = "조회실패";
	
	private Users findUserByIdentifier(Users user) {
		if (user.getUserId() == null)
			return null;
		return user.getUserId().contains("@") ? 
			ur.findByEmail(user.getUserId()): ur.findByUserId(user.getUserId());
	}
	
	public ApiResponse setUser(Users user) {
		try {
			String encryptedPassword = pe.encode(user.getUserPwd());
			user.setUserPwd(encryptedPassword);
			
			ur.save(user);
			
			return ApiResponse.apiBuilder(true, "회원가입에 성공하였습니다.");
		} catch (Exception e) {
			return ApiResponse.apiBuilder(false, "회원가입에 실패하였습니다: " + e.getMessage());
	    }
	}

	public ApiResponse checkDuplicatedId(String userId) {
		boolean isDuplicated = ur.findById(userId).isPresent();
		
		return isDuplicated ?
				ApiResponse.apiBuilder(false, "중복되는 아이디입니다.") : ApiResponse.apiBuilder(true, "사용 가능한 아이디입니다.");
	}

	public ApiResponse loginUser(Users user) {
		Users targetUser = findUserByIdentifier(user);
		
		if(targetUser != null && pe.matches(user.getUserPwd(), targetUser.getUserPwd())) {
			LoginResponse lr = LoginResponse.builder()
					.userId(targetUser.getUserId())
					.email(targetUser.getEmail())
					.name(targetUser.getName())
					.phone(targetUser.getPhone())
					.type(targetUser.getType())
					.build();
			
			return ApiResponse.apiBuilder(true, "로그인에 성공하였습니다.", lr);
		}
		return ApiResponse.apiBuilder(false, "로그인에 실패하였습니다.");
	}

	public ApiResponse findId(LoginRequest lr) {
		String email = lr.getEmail();
		Users user = ur.findUserIdByEmail(email).orElse(null);
		
		return user != null ? 
				ApiResponse.apiBuilder(true, "아이디 검색 성공", user.getUserId()) : ApiResponse.apiBuilder(false, "아이디를 찾을 수 없습니다.");
	}

	public ApiResponse findPassword(LoginRequest lr) {
		Users user = ur.findByUserIdAndEmailAndPhone(lr.getUserId(), lr.getEmail(), lr.getPhone());

		return user != null ? 
				ApiResponse.apiBuilder(true, "정보가 확인되었습니다. 새로운 비밀번호를 입력하세요.") : ApiResponse.apiBuilder(false, "입력한 정보가 일치하지 않습니다.");
	}

	public ApiResponse changePassword(LoginRequest lr) {
		String userId = lr.getUserId();
		
		String newPassword = pe.encode(lr.getNewPassword());
		Users user = ur.findByUserId(userId);
		if(user != null) {
			user.setUserPwd(newPassword);
			ur.save(user);
			
			return ApiResponse.apiBuilder(true, "비밀번호가 성공적으로 변경되었습니다.");
		}
		return ApiResponse.apiBuilder(false, "비밀번호 변경에 실패했습니다.");
	}

	public ApiResponse deleteUser(Users user) {
		try {
			Users targetUser = ur.findByUserIdAndEmailAndPhone(user.getUserId(), user.getEmail(), user.getPhone());
			if(targetUser != null && pe.matches(user.getUserPwd(), targetUser.getUserPwd())) {
				ur.delete(targetUser);
				
				return ApiResponse.apiBuilder(true, "회원 탈퇴가 완료되었습니다.");
			}
			return ApiResponse.apiBuilder(false, "회원 탈퇴에 실패하였습니다.");
		} catch(Exception e) {
			return ApiResponse.apiBuilder(false, "회원 탈퇴 중 오류가 발생하였습니다.");
		}
	}
	
	public ApiResponse verifyPassword(LoginRequest lr) {
		Users user = ur.findByUserId(lr.getUserId());
		System.out.println(lr.getUserPwd() + " is equal" + user.getUserPwd() + " : " + pe.matches(lr.getUserPwd(), user.getUserPwd()));
		if(user != null && pe.matches(lr.getUserPwd(), user.getUserPwd())){
			LoginResponse res = LoginResponse.builder()
					.userId(user.getUserId())
					.name(user.getName())
					.email(user.getEmail())
					.phone(user.getPhone())
					.build();
			
			return ApiResponse.apiBuilder(true, "비밀번호 검증 성공", user);
		}
		return ApiResponse.apiBuilder(false, "비밀번호가 일치하지 않습니다.");
	}

	public ApiResponse updateUserInfo(Users user) {
		Optional<Users> result = ur.findById(user.getUserId());
		
		if(result.isPresent()) {
			Users targetUser = result.get();
			
			if (user.getName() != null) {
			    targetUser.setName(user.getName());
			}
			if (user.getEmail() != null) {
			    targetUser.setEmail(user.getEmail());
			}
			if (user.getPhone() != null) {
			    targetUser.setPhone(user.getPhone());
			}
//			if (targetUser.getReceptioned() == null) {
//				targetUser.setReceptioned(false);
//			}
			
			ur.save(targetUser);
			
			return ApiResponse.apiBuilder(true, "회원정보가 수정되었습니다.");
		}
		return ApiResponse.apiBuilder(false, "회원정보 수정에 실패했습니다.");
	}
}
