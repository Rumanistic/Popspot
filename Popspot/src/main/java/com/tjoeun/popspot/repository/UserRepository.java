package com.tjoeun.popspot.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tjoeun.popspot.domain.Users;

import lombok.NonNull;

@Repository
public interface UserRepository extends JpaRepository<Users, String> {

	Users findByUserId(String userId);

	Users findByEmail(@NonNull String email);

	Optional<Users> findUserIdByEmail(String email);

	Users findByUserIdAndEmailAndPhone(String userId, String email, String phone);
	
}
