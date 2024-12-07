package com.tjoeun.popspot.domain;

import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@Data
@Entity
@Builder
@Table(name="USERS")
@NoArgsConstructor
@AllArgsConstructor
public class Users {
	@Id
	private String userId;

	@NonNull
	@Column(name="USER_PWD")
	private String userPwd;
	
	@NonNull
	@Column(name="NAME")
	private String name;
	
	@NonNull
	@Column(name="EMAIL")
	private String email;
	
	@NonNull
	@Column(name="PHONE")
	private String phone;
	
	//@NonNull
	@Column(name="IS_RECEPTIONED")
	private Boolean receptioned;
	
	
	@Column(name="TYPE")
	private int type;
	
	private String address;
	
	@CreatedDate
	@Column(name="CREATED_DATE", insertable=false, updatable=false, columnDefinition="DATE DEFAULT SYSDATE")
	private LocalDateTime createdDate;
	
	@LastModifiedDate
	@Column(name="MODIFIED_DATE", columnDefinition="DATE DEFAULT SYSDATE")
	private LocalDateTime modifiedDate;
	
	@Column(name="IS_DELETED", insertable=false, columnDefinition="NUMBER DEFAULT 0")
	private boolean deleted;
	
	@Column(name="DELETED_DATE")
	private LocalDateTime deletedDate;
}