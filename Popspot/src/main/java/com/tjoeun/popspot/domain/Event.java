package com.tjoeun.popspot.domain;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@Data
@Entity(name="EVENT")
@NoArgsConstructor
public class Event {
	@Id
	@SequenceGenerator(
				name="SEQ_EVENT_NO",
				sequenceName="SEQ_EVENT_NO",
				allocationSize=1
			)
	@GeneratedValue(generator="SEQ_EVENT_NO")
	@Column(name="EVENT_NO")
	private Long eventNo;

	@NonNull
	@Column(name="USER_ID")
	private String userId;
	
	@NonNull
	@Column(name="NAME")
	private String name;

	@NonNull
	@Column(name="TITLE")
	private String title;

	@NonNull
	@Column(name="COMPANY")
	private String company;

	@NonNull
	@Column(name="CONTENT", length = 4000)
	private String content;
	
	@Column(name="ADDRESS")
	private String address;
	
	@Column(name="LAT")
	private double lat;
	
	@Column(name="LON")
	private double lon;

	@NonNull
	@Column(name="START_DATE")
	private LocalDate startDate;

	@NonNull
	@Column(name="END_DATE")
	private LocalDate endDate;

	@NonNull
	@Column(name="OPEN_TIME")
	private LocalTime openTime;

	@NonNull
	@Column(name="CLOSE_TIME")
	private LocalTime closeTime;

	@Column(name="TYPE")
	private char type;

	@NonNull
	@Column(name="TAGS")
	private String tags;
	
	// 240909 추가 - 이미지 이름 저장
	@NonNull
	@Column(name="IMAGES")
	private String images;

	@NonNull
	@CreatedDate
	@Column(name="CREATED_DATE", insertable=false, updatable=false, columnDefinition="DATE DEFAULT SYSDATE")
	private LocalDateTime createdDate;

	@LastModifiedDate
	@Column(name="MODIFIED_DATE", columnDefinition="DATE DEFAULT SYSDATE")
	private LocalDateTime modifiedDate;
	
	// 오라클에선 Boolean 타입 JPA 매핑 시, 자동으로 NUMBER(1)로 지정한다고 함
	@Column(name="IS_DELETED", insertable=false, columnDefinition="NUMBER DEFAULT 0")
	private boolean deleted;
	
	@Column(name="DELETED_DATE")
	private LocalDateTime deletedDate;
}