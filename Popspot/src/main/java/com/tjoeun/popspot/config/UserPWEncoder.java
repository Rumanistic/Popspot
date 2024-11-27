package com.tjoeun.popspot.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class UserPWEncoder {
	@Bean
	public PasswordEncoder pe() {
		return new BCryptPasswordEncoder();
	}
}
