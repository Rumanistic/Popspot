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
 import { useNavigate } from 'react-router-dom';
 
 function EventSubmit() {
   const userId = sessionStorage.getItem('userId');
   const name = sessionStorage.getItem('name');
   const [openTime, setOpenTime] = useState({ hour: '9', min: '0' });
   const [closeTime, setCloseTime] = useState({ hour: '9', min: '0' });
   const [eventData, setEventData] = useState({
     userId,
     name,
     title: '',
     company: '',
     type: 'p',
     content: '',
     startDate: '',
     endDate: '',
     openTime: '',
     closeTime: '',
     tags: '',
     lat: '',
     lon: '',
   });
   const [alert, setAlert] = useState('');
   const [cLen, setCLen] = useState(0);
   const [value, setValue] = useState('');
   const [spans, setSpans] = useState([]);
   const [address, setAddress] = useState('');
   const HOURS = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
   const MINS = [0, 30];
   const navigate = useNavigate();
 
   useEffect(() => {
     const container = document.getElementById('map');
     const options = { center: new window.kakao.maps.LatLng(37.537187, 127.005476), level: 5 };
     const map = new window.kakao.maps.Map(container, options);
     const marker = new window.kakao.maps.Marker({ position: new window.kakao.maps.LatLng(37.537187, 127.005476), map });
     window.kakaoMapData = { map, marker };
   }, []);
 
    useEffect(() => {
      let cTime = `${closeTime.hour >= 10 ? closeTime.hour : '0' + closeTime.hour}:${closeTime.min >= 10 ? closeTime.min : '0' + closeTime.min}`;
      let oTime = `${openTime.hour >= 10 ? openTime.hour : '0' + openTime.hour}:${openTime.min >= 10 ? openTime.min : '0' + openTime.min}`;
      setEventData({
            ...eventData,
            openTime: oTime,
            closeTime: cTime,
      })
   }, [closeTime, openTime])
   
   const searchAddress = () => {
     new window.daum.Postcode({
       oncomplete: (data) => {
         const addr = data.address;
         setAddress(addr);
         setEventData({ ...eventData, address: addr });
         const { map, marker } = window.kakaoMapData;
         const geocoder = new window.kakao.maps.services.Geocoder();
         geocoder.addressSearch(addr, (results, status) => {
           if (status === window.kakao.maps.services.Status.OK) {
             const result = results[0];
             const coords = new window.kakao.maps.LatLng(result.y, result.x);
             setEventData((prev) => ({ ...prev, lat: result.y, lon: result.x }));
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
     if (e.key === 'Enter' && value.trim()) {
       e.preventDefault(); // Enter 키의 기본 동작 방지
       if (!spans.includes(value)) {
         // 중복 방지
         setSpans([...spans, value]);
       }
       setValue('');
     }
   };
 
   const deleteItem = (item) => {
     setSpans((prevSpans) => prevSpans.filter((span) => span !== item));
   };
 
   const contentChange = (e) => {
     const content = e.target.innerHTML.toString();
     const imgTagRegex = /<img[^>]*>/g;
     const strippedContent = content.replace(imgTagRegex, '');
     const contentLength = strippedContent.length;
 
     setCLen(contentLength);
     setEventData({ ...eventData, content });
   };
 
   const submitData = () => {
     const contentData = eventData.content.concat('[alert]', alert);
     const tags = spans.join(',');
     const submitDate={ ...eventData, content: contentData, tags }
     axios
       .post('/api/event/submit', submitDate, {
         headers: { 'Content-Type': 'application/json; charset=UTF-8' },
       })
       .then(() => navigate('/popup'))
       .catch((e)=>{console.log("오류오류오류시발오류",e)});
   };
 
   return (
     <EventContainer>
      <TitleContainer>
  <h1>팝업 스토어 등록</h1>
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
             <SelectTime name="hour" onChangeDate={(e) => setOpenTime({ ...openTime, hour: e.target.value })}>
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
            여기다 상세 정보를 입력하세요.<br/>
          	이미지의 경우 클립보드의 복사 - 붙여넣기로 삽입이 가능합니다.<br/>
          	단락이 끝났을 경우 Enter를, 끝나지 않았을 경우 Shift + Enter를 눌러 줄바꿈해주세요.
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
 
 export default EventSubmit;
 