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
	const { state } = useLocation();
	const event = state.event;
	const navigate = useNavigate();
  
	// State Variables
	const [eventData, setEventData] = useState({ ...event });
	const [alertMessage, setAlertMessage] = useState('');
	const [cLen, setCLen] = useState(0);
	const [value, setValue] = useState('');
	const [spans, setSpans] = useState(event.tags ? event.tags.split(',') : []);
	const [address, setAddress] = useState(event.address || '');
	const [openTime, setOpenTime] = useState({
	  hour: event.openTime ? event.openTime.split(':')[0] : '9',
	  min: event.openTime ? event.openTime.split(':')[1] : '0'
	});
	const [closeTime, setCloseTime] = useState({
	  hour: event.closeTime ? event.closeTime.split(':')[0] : '9',
	  min: event.closeTime ? event.closeTime.split(':')[1] : '0'
	});
  
	const HOURS = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
	const MINS = [0, 30];
  
	useEffect(() => {
	  // Initialize Kakao Map
	  if (!window.kakao || !window.kakao.maps) {
		console.error('Kakao Maps API가 로드되지 않았습니다.');
		return;
	  }
  
	  const container = document.getElementById('map');
	  if (!container) {
		console.error('Map container not found.');
		return;
	  }
  
	  const options = {
		center: new window.kakao.maps.LatLng(37.537187, 127.005476),
		level: 5,
	  };
  
	  const map = new window.kakao.maps.Map(container, options);
	  const marker = new window.kakao.maps.Marker({
		position: new window.kakao.maps.LatLng(37.537187, 127.005476),
		map: map,
	  });
  
	  window.kakaoMapData = { map, marker };
	}, []);
  
	useEffect(() => {
	  // Extract content and alert message
	  const text = event.content || '';
	  const lastAlertIdx = text.lastIndexOf('[alert]');
	  if (lastAlertIdx !== -1) {
		setAlertMessage(text.substring(lastAlertIdx + 7).trim());
		setEventData((prev) => ({
		  ...prev,
		  content: text.substring(0, lastAlertIdx),
		}));
	  }
	}, [event.content]);
  
	useEffect(() => {
	  // Update time strings
	  const oTime = `${openTime.hour}:${openTime.min.padStart(2, '0')}`;
	  const cTime = `${closeTime.hour}:${closeTime.min.padStart(2, '0')}`;
	  setEventData((prev) => ({
		...prev,
		openTime: oTime,
		closeTime: cTime,
	  }));
	}, [openTime, closeTime]);
  
	const searchAddress = () => {
	  new window.daum.Postcode({
		oncomplete: function (data) {
		  const addr = data.address;
		  setAddress(addr);
		  setEventData((prev) => ({ ...prev, address: addr }));
  
		  const { map, marker } = window.kakaoMapData;
		  const geocoder = new window.kakao.maps.services.Geocoder();
		  geocoder.addressSearch(addr, function (results, status) {
			if (status === window.kakao.maps.services.Status.OK) {
			  const result = results[0];
			  const coords = new window.kakao.maps.LatLng(result.y, result.x);
  
			  document.getElementById('map').style.display = 'block';
			  map.relayout();
			  map.setCenter(coords);
			  marker.setPosition(coords);
  
			  setEventData((prev) => ({
				...prev,
				lat: result.y,
				lon: result.x,
			  }));
			} else {
			  console.error('주소 검색에 실패했습니다.');
			}
		  });
		},
	  }).open();
	};
  
	const onKeyPressed = (e) => {
	  if (e.key === 'Enter' && value.trim() && spans.length < 5) {
		setSpans([...spans, value]);
		setValue('');
	  }
	};
  
	const deleteItem = (tag) => {
	  setSpans(spans.filter((span) => span !== tag));
	};
  
	const contentChange = (e) => {
	  const content = e.target.innerHTML.replace(/<img[^>]*>/g, '');
	  setCLen(content.length);
	  setEventData((prev) => ({ ...prev, content }));
	};
  
	const submitData = () => {
	  if (!eventData.title || !eventData.company || !address) {
		window.alert('필수 정보를 모두 입력해주세요!');
		return;
	  }
  
	  const payload = {
		...eventData,
		tags: spans.join(','),
		content: eventData.content.concat('[alert]', alertMessage),
	  };
  
	  axios
		.put(`/api/event/${eventData.eventNo}`, payload, {
		  headers: {
			'Content-Type': 'application/json; charset=UTF-8',
		  },
		})
		.then(() => {
		  navigate('/popup');
		})
		.catch((error) => {
		  console.error('Error:', error);
		});
	};
  
	return (
	  <EventContainer>
		<TitleContainer>
		  <h1>행사 수정</h1>
		  <TitleImage src="/register.png" alt="등록 이미지" />
		</TitleContainer>
  
		<h1>
		  <TitleInput
			name="title"
			value={eventData.title || ''}
			onChange={(e) => setEventData({ ...eventData, title: e.target.value })}
			placeholder="타이틀을 입력해주세요!"
		  />
		</h1>
		<DetailItem>
		  <h3>
			<SubInput
			  name="company"
			  value={eventData.company || ''}
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
			  <SelectTime
				name="hour"
				value={openTime.hour}
				onChange={(e) => setOpenTime({ ...openTime, hour: e.target.value })}
			  >
				{HOURS.map((h) => (
				  <option key={h} value={h}>
					{h}
				  </option>
				))}
			  </SelectTime>
			  :
			  <SelectTime
				name="min"
				value={openTime.min}
				onChange={(e) => setOpenTime({ ...openTime, min: e.target.value })}
			  >
				{MINS.map((m) => (
				  <option key={m} value={m}>
					{m < 10 ? `0${m}` : m}
				  </option>
				))}
			  </SelectTime>
			</span>
			&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;
			<span>
			  <SelectTime
				name="hour"
				value={closeTime.hour}
				onChange={(e) => setCloseTime({ ...closeTime, hour: e.target.value })}
			  >
				{HOURS.map((h) => (
				  <option key={h} value={h}>
					{h}
				  </option>
				))}
			  </SelectTime>
			  :
			  <SelectTime
				name="min"
				value={closeTime.min}
				onChange={(e) => setCloseTime({ ...closeTime, min: e.target.value })}
			  >
				{MINS.map((m) => (
				  <option key={m} value={m}>
					{m < 10 ? `0${m}` : m}
				  </option>
				))}
			  </SelectTime>
			</span>
		  </p>
		</DetailItem>
		<DetailItem>
		  <h3>상세 정보</h3>
		  <EditableParagraph
			contentEditable
			onInput={contentChange}
			dangerouslySetInnerHTML={{ __html: eventData.content || '' }}
		  />
		  <span>{cLen}/4000 bytes</span>
		</DetailItem>
		<DetailItem>
		  <h3>위치</h3>
		  <AddressInput
			type="text"
			value={address}
			placeholder="주소를 입력해주세요"
			readOnly
		  />
		  <AddressButton onClick={searchAddress}>주소 검색</AddressButton>
		  <MapContainer id="map" style={{ width: '100%', height: '400px', display: 'block' }} />
		</DetailItem>
		<DetailItem>
		  <h3>안내 및 주의사항</h3>
		  <textarea
			onChange={(e) => setAlertMessage(e.target.value)}
			value={alertMessage}
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
  