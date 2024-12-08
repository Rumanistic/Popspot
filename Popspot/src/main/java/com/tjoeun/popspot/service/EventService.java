package com.tjoeun.popspot.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tjoeun.popspot.config.ImageManager;
import com.tjoeun.popspot.domain.Event;
import com.tjoeun.popspot.domain.dto.ApiResponse;
import com.tjoeun.popspot.domain.mapping.TagList;
import com.tjoeun.popspot.repository.EventRepository;
import com.tjoeun.popspot.repository.LikeCountRepository;

@Service
public class EventService {
	@Autowired
	EventRepository er;
	
	
	ImageManager im = new ImageManager();
	
	private static final String SUCCESS = "성공";
	private static final String FAIL = "실패";
    private static final String NOT_FOUND = "조회실패";

	public List<Event> getAllList() {
		return er.findAllByDeletedOrderByCreatedDateDesc(false);
	}

	public ApiResponse submitEvent(Event e) throws Exception {
		String company = e.getCompany();
		String content = e.getContent();
		
		HashMap<String, String> resultSet = im.saveImage(content, company);
		e.setImages(resultSet.get("images"));
		e.setContent(resultSet.get("content"));
		
		er.save(e);
		
		return ApiResponse.apiBuilder(true, SUCCESS);
	}

	public ApiResponse getAllTags() {
		List<TagList> tagList = er.findTagsByDeleted(false);
		
		if(tagList.size() > 0) {
			Set<String> tags = new HashSet<String>();
			
			for(TagList s : tagList) {
				String[] temp = s.getTags().split(",");
				tags.addAll(Arrays.asList(temp));
			}
			
			return ApiResponse.apiBuilder(true, SUCCESS, tags);
		}
		
		return ApiResponse.apiBuilder(false, FAIL);
	}

	public List<Event> searchListByTag(String[] tagArr) {
		Set<Event> tagSet = new HashSet<>();
		for(String s : tagArr)
			tagSet.addAll(er.findByTagsContainingAndDeletedOrderByCreatedDateDesc(s, false));
		
		return new ArrayList<>(tagSet);
	}

	public Event getEvent(Long eventNo) {
		return er.findById(eventNo).orElse(null);
	}
	
	public ApiResponse editEvent(Event e) throws Exception {
		String curDir = new StringBuilder(e.getCompany())
				.append(e.getCreatedDate()
						.toLocalDate()
						.toString()
						.replaceAll("-", ""))
				.toString();
		String images = e.getImages();
		HashMap<String, String> resultSet = im.editImage(e.getContent(), e.getCompany(), curDir, images);
		System.out.println(resultSet.get("images"));
		System.out.println(resultSet.get("content"));
		e.setImages(resultSet.get("images"));
		e.setContent(resultSet.get("content"));
		
		er.save(e);
		
		return ApiResponse.apiBuilder(true, SUCCESS);
	}

	public ApiResponse deleteEvent(Long eventNo) {
		Optional<Event> event = er.findById(eventNo);
		
		if(event.isPresent()) {
			Event e = event.get();
			e.setDeleted(true);
			er.save(e);
			
			return ApiResponse.apiBuilder(true, SUCCESS);
		}
		
		return ApiResponse.apiBuilder(false, FAIL);
	}

	public ApiResponse getRecentEvents() {
		List<Event> recentEvents = er.findTop8ByDeletedOrderByCreatedDateDesc(false);
		
		if(recentEvents.size() > 0) {
			return ApiResponse.apiBuilder(true, SUCCESS, recentEvents);
		}

		return ApiResponse.apiBuilder(false, FAIL);
	}
	
	
	public List<Event> searchListByKeyword(String keyword) {  
	    return er.searchListByKeywordAndDeletedOrderByCreatedDateDesc(keyword, false);
	}

	
	
}
