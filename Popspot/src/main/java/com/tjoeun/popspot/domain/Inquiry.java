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
@Table(name="INQUIRY")
@NoArgsConstructor
@AllArgsConstructor
public class Inquiry {
	@Id
	@SequenceGenerator(
				name="SEQ_INQUIRY_NO",
				sequenceName="SEQ_INQUIRY_NO",
				allocationSize=1
			)
	@GeneratedValue(generator="SEQ_INQUIRY_NO")
	@Column(name="INQUIRY_NO")
	private Long inquiryNo;
	
	@NonNull
	@Column(name="USER_ID", nullable=false)
	private String userId;
	
	@NonNull
	@Column(name="INQUIRY_TITLE")
	private String inqTitle;
	
	@NonNull
	@Column(name="INQUIRY_CONTENT")
	private String inqContent;
	
	@Column(name="TYPE")
	private int type;
	
	@Column(name="IS_SECRET")
	private int secret;
	
	@CreatedDate
	@Column(name="CREATED_DATE", insertable=false, updatable=false, columnDefinition="DATE DEFAULT SYSDATE")
	private LocalDateTime createdDate;
	
	@NonNull
	@LastModifiedDate
	@Column(name="MODIFIED_DATE", columnDefinition="DATE DEFAULT SYSDATE")
	private LocalDateTime modifiedDate;
	
	@Column(name="IS_DELETED", insertable=false, columnDefinition="NUMBER(1) DEFAULT 0")
	private boolean deleted;
	
	@Column(name="DELETED_DATE")
	private LocalDateTime deletedDate;
}