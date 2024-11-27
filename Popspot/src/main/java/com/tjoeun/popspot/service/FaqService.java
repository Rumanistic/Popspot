package com.tjoeun.popspot.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tjoeun.popspot.domain.Faq;
import com.tjoeun.popspot.domain.dto.ApiResponse;
import com.tjoeun.popspot.repository.FaqRepository;

@Service
public class FaqService {
	@Autowired
	private FaqRepository fr;
	
	private static final String SUCCESS = "성공";
	private static final String FAIL = "실패";
    private static final String NOT_FOUND = "조회실패";

	public ApiResponse getAllFaqs() {
		List<Faq> fList = fr.findByDeleted(false);
		
		return fList.size() > 0 ? 
				ApiResponse.apiBuilder(true, SUCCESS, fList) : ApiResponse.apiBuilder(false, NOT_FOUND);
	}

	public ApiResponse submitFaq(Faq f) {
		fr.save(f);
		return ApiResponse.apiBuilder(true, SUCCESS);
	}

	public ApiResponse editFaq(Long no, Faq faq) {
		Optional<Faq> fOption = fr.findById(no);
		
		if(fOption.isPresent()) {
			Faq f = fOption.get();
			f.setQuestion(faq.getQuestion());
			f.setAnswer(faq.getAnswer());
			f.setModifiedDate(LocalDateTime.now());
			
			fr.save(f);
			
			return ApiResponse.apiBuilder(true, SUCCESS);
		}
		return ApiResponse.apiBuilder(false, FAIL);
	}

	public ApiResponse deleteFaq(Long no) {
		Optional<Faq> fOption = fr.findById(no);
		
		if(fOption.isPresent()) {
			Faq f = fOption.get();
			f.setDeleted(true);
			
			fr.save(f);
			
			return ApiResponse.apiBuilder(true, SUCCESS);
		}
		return ApiResponse.apiBuilder(false, FAIL);
	}
}
