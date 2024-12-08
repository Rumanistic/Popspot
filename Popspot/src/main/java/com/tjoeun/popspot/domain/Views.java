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
@Table(name="VIEWS_CNT")
public class Views {
	// 조회수 테이블 한시간에 한번씩 기록하기?
	
	//pk 두개 이상 지정 
 	@Embeddable
    @Data
    public static class ViewsId implements Serializable {
 		// 오늘 날짜 format YYYYMMDDhh 형식으로 저장 예정
        @Column(name = "VEIW_DATE")
        private String viewDate;

        // 행사 번호 
        @Column(name = "EVENT_NO")
        private Long eventNo;

        public ViewsId() {}

        public ViewsId(String Date, Long eventNo) {
            this.viewDate = viewDate;
            this.eventNo = eventNo;
        }
    }
 	
 	@EmbeddedId
    private ViewsId viewsId;
 	
 	// 조회수 갯수 
 	@Column(name="VIEWCOUNT")
	private int VIEWCOUNT;
 	
	// 생성 시간 
 	@CreatedDate
	@Column(name="CREATED_DATE" , updatable = false)
	private LocalDateTime createdDate;
 	
 	// 수정 시간 
 	@LastModifiedDate
	@Column(name="MODIFIED_DATE", columnDefinition="DATE DEFAULT SYSDATE")
	private LocalDateTime modifiedDate;
 	
 	
 	
 	
 	
	
}
