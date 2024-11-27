package com.tjoeun.popspot.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tjoeun.popspot.domain.InquiryReply;

public interface InquiryReplyRepository extends JpaRepository<InquiryReply, Long> {

	Optional<InquiryReply> findByInquiryNo(Long no);

}