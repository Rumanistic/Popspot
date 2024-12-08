package com.tjoeun.popspot.repository;

import java.util.List;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.QueryHints;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.tjoeun.popspot.domain.Event;
import com.tjoeun.popspot.domain.mapping.TagList;

import jakarta.persistence.QueryHint;

@Repository
public interface EventRepository extends JpaRepository<Event, Long>  {

	List<Event> findAllByDeletedOrderByCreatedDateDesc(boolean b);
	
	List<TagList> findTagsByDeleted(boolean b);

	Set<Event> findByTagsContainingOrderByCreatedDateDesc(String s);

	List<Event> findTop8ByDeletedOrderByCreatedDateDesc(boolean b);
	
	@Query(value = "SELECT * FROM EVENT " +
            "WHERE (LOWER(TITLE) LIKE LOWER('%' || :keyword || '%') " +
            "   OR LOWER(TAGS) LIKE LOWER('%' || :keyword || '%') " +
            "   OR LOWER(CONTENT) LIKE LOWER('%' || :keyword || '%') " +
            "   OR LOWER(COMPANY) LIKE LOWER('%' || :keyword || '%')) " +
            "   AND IS_DELETED = 0",
	    nativeQuery = true)
	@QueryHints(@QueryHint(name = "org.hibernate.cacheable", value = "false"))
	List<Event> searchListByKeyword(@Param("keyword") String keyword);
	

	//좋아요 수로 정렬해서 가져오기
//	List<Event> findLikeCountEvent();
	@Query(value = "SELECT * FROM EVENT " +
            "WHERE 1 = 1" +
			"	AND (LOWER(TITLE) LIKE LOWER('%' || :keyword || '%') " +
            "   OR LOWER(TAGS) LIKE LOWER('%' || :keyword || '%') " +
            "   OR LOWER(CONTENT) LIKE LOWER('%' || :keyword || '%') " +
            "   OR LOWER(COMPANY) LIKE LOWER('%' || :keyword || '%'))" +
            "	AND IS_DELETED = :b " +
            "ORDER BY CREATED_DATE DESC",
	    nativeQuery = true)
	@QueryHints(@QueryHint(name = "org.hibernate.cacheable", value = "false"))
	List<Event> searchListByKeywordAndDeletedOrderByCreatedDateDesc(String keyword, boolean b);
}
