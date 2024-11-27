package com.tjoeun.popspot.repository;

import java.util.List;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tjoeun.popspot.domain.Event;
import com.tjoeun.popspot.domain.mapping.TagList;

@Repository
public interface EventRepository extends JpaRepository<Event, Long>  {

	List<Event> findAllByDeleted(boolean b);
	
	List<TagList> findTagsByDeleted(boolean b);

	Set<Event> findByTagsContaining(String s);

	List<Event> findTop8ByDeletedOrderByCreatedDateDesc(boolean b);

}
