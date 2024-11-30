package com.tjoeun.popspot.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.tjoeun.popspot.domain.Review;
import com.tjoeun.popspot.domain.mapping.ReviewPoint;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {

	List<Review> findByEventNoOrderByCreatedDateDesc(Long eventNo);
	
	List<Review> findByEventNoAndDeleted(Long eventNo, boolean b);

	@Query(value = "select r.event_no as eventNo, avg(r.rating) as reviewPointAvg from review r where r.is_deleted = :i group by r.event_no", nativeQuery = true)
	List<ReviewPoint> findAllByDeleted(@Param("i") int i);

	@Query(value = "select r.event_no as eventNo, avg(r.rating) as reviewPointAvg from review r where r.event_no = :l and r.is_deleted = :i group by r.event_no", nativeQuery = true)
	List<ReviewPoint> findAllByEventNoAndDeleted(@Param("l") Long l, @Param("i") int i);

	Optional<Review> findByReviewNo(Long no);
 
}
