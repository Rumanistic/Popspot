package com.tjoeun.popspot.domain;

import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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
@Table(name="FAQ")
@NoArgsConstructor
@AllArgsConstructor
public class Faq {
	@Id
	@SequenceGenerator(
				name="SEQ_FAQ_NO",
				sequenceName="SEQ_FAQ_NO",
				allocationSize=1
			)
	@GeneratedValue(generator="SEQ_FAQ_NO")
	@Column(name="FAQ_NO")
	private Long faqNo;
	
	@NonNull
	@Column(name="USER_ID", nullable=false)
	private String userId;
	
	@NonNull
	@Column(name="QUESTION")
	private String question;
	
	@NonNull
	@Column(name="ANSWER")
	private String answer;

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