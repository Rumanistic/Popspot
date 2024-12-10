import {
	EventContainer,
	TitleInput,
	DetailItem,
	SubInput,
	TagContainer,
	TagInput,
	Tag,
	DeleteButton,
	SelectTime,
	EditableParagraph,
	AddressInput,
	AddressButton,
	MapContainer,
	SubmitButton,
	DateContainer,
	TitleContainer,
	TitleImage
  } from '../styles/EventSubmitStyle';
import SemiCalendar from '../component/SemiCalendar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { EventImages, EventParagraph } from '../styles/EventDetailStyle';

function EventEdit() {
	const userId = sessionStorage.getItem("userId");
	const {state} = useLocation();
	const event = state.event;
	const eventContentData = event.content;
	
	const [openTime, setOpenTime] = useState({hour: '9', min: '0'})
	const [closeTime, setCloseTime] = useState({hour: '9', min: '0'})
	
	const [eventData, setEventData] = useState({...event});
	const [alert, setAlert] = useState('');
	const [cLen, setCLen] = useState(0);
	const [value, setValue] = useState('');
	const [spans, setSpans] = useState(eventData.tags.split(','));
	const [address, setAddress] = useState(eventData.address);
	
	const HOURS = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
	const MINS = [0, 30];
	const navigate = useNavigate();

	useEffect (() => {

		if (!window.kakao || !window.kakao.maps) {
		   console.error('Kakao Maps API가 로드되지 않았습니다.');
		   return;
	   }
  
	   
		   const container =document.getElementById('map');
		   const options = {
			  center: new window.kakao.maps.LatLng(37.537187, 127.005476),
			  level: 5,
		   };
  
		   const map = new window.kakao.maps.Map(container, options);
		   const marker = new window.kakao.maps.Marker({
			  position: new window.kakao.maps.LatLng(37.537187, 127.005476),
			  map: map,
		   });
  
		   window.kakaoMapData = { map, marker};
  
	 },[]);
  
	 const searchAddress = () => {
		new window.daum.Postcode({
		   oncomplete: function (data) {
			  const addr = data.address;
			  setAddress(addr);
			  setEventData({...eventData, address:addr});
  
			  const {map, marker} = window.kakaoMapData;
		   const geocoder = new window.kakao.maps.services.Geocoder();
			  geocoder.addressSearch(addr, function (results, status) {
				 if (status === window.kakao.maps.services.Status.OK) {
					const result = results[0];
					const coords = new window.kakao.maps.LatLng(result.y, result.x);
					setEventData((prev) => ({
					   ...prev,
					   lat: result.y,
					   lon: result.x,
					}));
					
					document.getElementById('map').style.display = 'block';
					map.relayout();
					map.setCenter(coords);
					marker.setPosition(coords);
				 }
			  });
		   },
		}).open();
	 };
	
	const onKeyPressed = (e) => {
		if(e.key === 'Enter' && value.trim()) {
			setSpans([...spans, value]);
			setValue('');
		}
	}
	
	const deleteItem = (e) => {
		setSpans(spans.filter((span) => span !== e))
	}
	
	const dataChange = (e) => {	
		setEventData({
				...eventData,
				[e.target.name]: e.target.value
		})
	}
	
	const setStartCalendarDate = (e) => {
		setEventData({
			...eventData,
			startDate: e
		})
	}
	
	const setEndCalendarDate = (e) => {
		setEventData({
			...eventData,
			endDate: e
		})
	}
	
	const setOTime = (e) => {
		let time = (e.target.value).toString(); 
		if(time < 10){
			time = '0' + e.target.value;
		}
		
		setOpenTime({
			...openTime,
			[e.target.name]: e.target.value
		})
		
		console.log(openTime)
	}
	
	const setCTime = (e) => {
		let time = (e.target.value).toString(); 
		if(time < 10){
			time = '0' + e.target.value;
		}
		
		setCloseTime({
			...closeTime,
			[e.target.name]: e.target.value
		})
	}
	
	const contentChange = (e) => {
		let content = (e.target.innerHTML).toString();
	  
	  // 정규 표현식으로 모든 <img> 태그를 찾고 제거
	  const imgTagRegex = /<img[^>]*>/g;
	  const strippedContent = content.replace(imgTagRegex, '');  // 이미지 태그 제거
	  
	  // 이미지 태그를 제외한 콘텐츠의 길이 계산
	  let contentLength = strippedContent.length;
		
		setCLen(contentLength);
		setEventData({
			...eventData,
			content
		})
	}
	
	const submitData = () => {
		let contentData = eventData.content.concat("[alert]",alert);
		let tags = spans.join(',');
		
		console.log(contentData);
		let submitData = {
			...eventData,
			content: contentData, 
			tags
		};
		
		console.log(submitData);
		axios.put(`/api/event/${submitData.eventNo}`, submitData, {
	    headers: {
	        'Content-Type': 'application/json; charset=UTF-8'  
	    }
		}).then(result => {
				console.log(result);
				navigate('/popup');
			})
	}
	
	useEffect(() => {
		const text = eventContentData;
		const lastAlertIdx = text.lastIndexOf("[alert]");
		
		if(lastAlertIdx !== -1){
			const alertTextContent = text.substring(lastAlertIdx + 7).trim();
			setAlert(alertTextContent);
		}
	}, [eventContentData])
	
	const hashedContent = () => {
		const text = eventContentData;
		const firstAlertIdx = text.indexOf("[alert]");
		const splitText = text.substring(0, firstAlertIdx).split(/<(?:\/)?[a-zA-Z][^>]*>/);
		const imgRegex = /^image[0-9]*/;
		const hyphenRemover = /-/g;
		
		const checkDir = (createdDate) => {
			const date = createdDate.replace(hyphenRemover, '');
			
			return date.substring(0,8);
		}
		
		return (
			<span>
				{splitText.map((e, i) => {return (
					imgRegex.test(e) ? 
						<EventImages src={`/img/${eventData.company}${checkDir(eventData.createdDate)}/${eventData.company}_${e.substring(5)}.png`} alt=''/>:
						<EventParagraph>{e}</EventParagraph>
				)})}
			</span>
		)
	}
	
	useEffect(() => {
		let cTime = `${closeTime.hour >= 10 ? closeTime.hour : '0' + closeTime.hour}:${closeTime.min >= 10 ? closeTime.min : '0' + closeTime.min}`;
		let oTime = `${openTime.hour >= 10 ? openTime.hour : '0' + openTime.hour}:${openTime.min >= 10 ? openTime.min : '0' + openTime.min}`;
		setEventData({
				...eventData,
				openTime: oTime,
				closeTime: cTime,
		})
	}, [closeTime, openTime])
	
	useEffect(() => {
		console.log(eventData);
	}, [eventData])
	
	useEffect(() => {
		hashedContent();
	}, [])

	return (
		<EventContainer>
		 <TitleContainer>
	 <h1>행사 수정</h1>
	 <TitleImage src="/register.png" alt="등록 이미지" />
   </TitleContainer>
   
		  <h1>
			<TitleInput
			  name="title"
			  onChange={(e) => setEventData({ ...eventData, title: e.target.value })}
			  placeholder="타이틀을 입력해주세요!"
			/>
		  </h1>
		  <DetailItem>
			<h3>
			  <SubInput
				name="company"
				onChange={(e) => setEventData({ ...eventData, company: e.target.value })}
				placeholder="회사(상호)명을 입력해주세요!"
			  />
			</h3>
		  </DetailItem>
		  <DetailItem>
		  <TagContainer>
			 {spans.map((tag, index) => (
			   <Tag key={index}>
				 {tag}
				 <DeleteButton onClick={() => deleteItem(tag)}>x</DeleteButton>
			   </Tag>
			 ))}
		   </TagContainer>
		   <TagInput
			 name="tags"
			 value={value}
			 onChange={(e) => setValue(e.target.value)}
			 onKeyDown={onKeyPressed}
			 placeholder="태그를 입력 후 엔터를 눌러주세요!(최대 5개)"
		   />
		  </DetailItem>
		  <DetailItem>
	 <h3>운영 날짜</h3>
	 <DateContainer>
	   <SemiCalendar
		 d={eventData.startDate}
		 onChangeDate={(date) => setEventData({ ...eventData, startDate: date })}
	   />
	   ~
	   <SemiCalendar
		 d={eventData.endDate}
		 onChangeDate={(date) => setEventData({ ...eventData, endDate: date })}
	   />
	 </DateContainer>
   </DetailItem>
   
   
		  <DetailItem>
			<h3>운영 시간</h3>
			<p>
			  <span>
				<SelectTime name="hour" onChange={(e) => setOpenTime({ ...openTime, hour: e.target.value })}>
				  {HOURS.map((h, i) => (
					<option key={i} value={h}>
					  {h}
					</option>
				  ))}
				</SelectTime>
				:
				<SelectTime name="min" onChange={(e) => setOpenTime({ ...openTime, min: e.target.value })}>
				  {MINS.map((m, i) => (
					<option key={i} value={m}>
					  {m < 10 ? `0${m}` : m}
					</option>
				  ))}
				</SelectTime>
			  </span>
			  &nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;
			  <span>
				<SelectTime name="hour" onChange={(e) => setCloseTime({ ...closeTime, hour: e.target.value })}>
				  {HOURS.map((h, i) => (
					<option key={i} value={h}>
					  {h}
					</option>
				  ))}
				</SelectTime>
				:
				<SelectTime name="min" onChange={(e) => setCloseTime({ ...closeTime, min: e.target.value })}>
				  {MINS.map((m, i) => (
					<option key={i} value={m}>
					  {m < 10 ? `0${m}` : m}
					</option>
				  ))}
				</SelectTime>
			  </span>
			</p>
		  </DetailItem>
		  <DetailItem>
			<h3>상세 정보</h3>
			<EditableParagraph contentEditable onInput={contentChange}>
			  여기다 상세 정보를 입력하세요.
			</EditableParagraph>
			<span>{cLen}/4000 bytes</span>
		  </DetailItem>
		  <DetailItem>
			<h3>위치</h3>
			<AddressInput type="text" value={address} placeholder="주소를 입력해주세요" readOnly />
			<AddressButton onClick={searchAddress}>주소 검색</AddressButton>
			<MapContainer id="map" />
		  </DetailItem>
		  <DetailItem>
			<h3>안내 및 주의사항</h3>
			<textarea
			  onChange={(e) => setAlert(e.target.value)}
			  placeholder="안내 및 주의사항을 입력해주세요."
			  style={{
				width: '100%',
				height: '100px',
				border: '1px solid #1F2933',
				padding: '10px',
				fontSize: '1rem',
			  }}
			/>
		  </DetailItem>
		  <SubmitButton onClick={submitData}>등록</SubmitButton>
		</EventContainer>
	  );
	}
export default EventEdit;
