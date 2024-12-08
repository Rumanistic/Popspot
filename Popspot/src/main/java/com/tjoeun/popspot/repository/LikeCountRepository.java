package com.tjoeun.popspot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.tjoeun.popspot.domain.LikeCount;

@Repository
public interface LikeCountRepository extends JpaRepository<LikeCount,LikeCount.LikeCountId>{

	//해당 이벤트의 좋아요 수 가져오기
    @Query(value = "SELECT COUNT(*) FROM LIKECOUNT WHERE EVENT_NO = :eventNo", nativeQuery = true)
	Long likeNo(@Param("eventNo") Long eventNo);

    // 특정 사용자가 특정 이벤트를 좋아요 했는지 확인
	boolean existsByIdEventNoAndIdUserId(Long eventNo, String userId);

	void deleteByIdEventNoAndIdUserId(Long eventNo, String userId);

}
