package com.tjoeun.popspot.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tjoeun.popspot.domain.Inquiry;

public interface InquiryRepository extends JpaRepository<Inquiry, Long> {

	List<Inquiry> findAllByDeletedOrderByCreatedDateDesc(boolean b);

}