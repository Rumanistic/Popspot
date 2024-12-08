package com.tjoeun.popspot.domain;

import java.io.Serializable;
import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@EntityListeners(AuditingEntityListener.class)
@Table(name="LIKECOUNT")
public class LikeCount {
	
		//pk 두개 이상 지정 
	 	@Embeddable
	    @Data
	    public static class LikeCountId implements Serializable {
	 		// 유저의 아이디
	        @Column(name = "userId")
	        private String userId;

	        
	        // 행사 번호 
	        @Column(name = "EVENT_NO")
	        private Long eventNo;

	        public LikeCountId() {}

	        public LikeCountId(String userId, Long eventNo) {
	            this.userId = userId;
	            this.eventNo = eventNo;
	        }
	    }
	 	
	 	@EmbeddedId
	 	private LikeCountId id;
	 	 
	 	// 생성 시간 
	 	@CreatedDate
		@Column(name="CREATED_DATE")
		private LocalDateTime createdDate;
	 	
	 	// 수정 시간 
	 	@LastModifiedDate
		@Column(name="MODIFIED_DATE", columnDefinition="DATE DEFAULT SYSDATE")
		private LocalDateTime modifiedDate;
	 	
	

}
