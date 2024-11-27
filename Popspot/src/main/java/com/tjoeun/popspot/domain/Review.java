package com.tjoeun.popspot.domain;

import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@Data
@Entity
@Table(name="REVIEW")
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Review {
	@Id
	@SequenceGenerator(
			name="SEQ_REVIEW_NO",
			sequenceName="SEQ_REVIEW_NO",
			allocationSize=1
		)
	@GeneratedValue(generator="SEQ_REVIEW_NO")
	@Column(name = "REVIEW_NO")
	private Long reviewNo;
	
	@NonNull
	@Column(name="EVENT_NO")
	private Long eventNo;
	
	@NonNull
	@Column(name="USER_ID")
	private String userId;
	
	@NonNull
	@Column(name = "CONTENT")
	private String content;
	
	@Column(name = "RATING")
	private double rating;
	
	@NonNull
	@CreatedDate
	@Column(name="CREATED_DATE", insertable=false, updatable=false, columnDefinition="DATE DEFAULT SYSDATE")
	private LocalDateTime createdDate;

	@NonNull
	@LastModifiedDate
	@Column(name="MODIFIED_DATE", columnDefinition="DATE DEFAULT SYSDATE")
	private LocalDateTime modifiedDate;
	
	// 오라클에선 Boolean 타입 JPA 매핑 시, 자동으로 NUMBER(1)로 지정한다고 함
	@Column(name="IS_DELETED", insertable=false, columnDefinition="NUMBER DEFAULT 0")
	private boolean deleted;
	
	@Column(name="DELETED_DATE")
	private LocalDateTime deletedDate;
}