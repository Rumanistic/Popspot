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

	List<Event> findAllByDeleted(boolean b);
	
	List<TagList> findTagsByDeleted(boolean b);

	Set<Event> findByTagsContaining(String s);

	List<Event> findTop8ByDeletedOrderByCreatedDateDesc(boolean b);
	
	@Query(value = "SELECT * FROM EVENT " +
            "WHERE LOWER(TITLE) LIKE LOWER('%' || :keyword || '%') " +
            "   OR LOWER(TAGS) LIKE LOWER('%' || :keyword || '%') " +
            "   OR LOWER(CONTENT) LIKE LOWER('%' || :keyword || '%') " +
            "   OR LOWER(COMPANY) LIKE LOWER('%' || :keyword || '%')",
	    nativeQuery = true)
	@QueryHints(@QueryHint(name = "org.hibernate.cacheable", value = "false"))
	List<Event> searchListByKeyword(@Param("keyword") String keyword);
}
