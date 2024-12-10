package com.tjoeun.popspot.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tjoeun.popspot.domain.Faq;

@Repository
public interface FaqRepository extends JpaRepository<Faq, Long>{
	List<Faq> findByDeletedOrderByFaqNo(boolean deleted);
}