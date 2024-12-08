import './EventSubmit.css';
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
    <div>
    	<div className="event-container">
    		<h1><input name="title" onChange={dataChange} placeholder='타이틀을 입력해주세요!' value={eventData.title}/></h1>
  			<div className="event-detail-item">
          <h3><input name="company" onChange={dataChange} placeholder='회사(상호)명을 입력해주세요!' value={eventData.company}/></h3>
        </div>
        <div className="event-detail-item">
          {spans.map((s, i) => {
						return(
							<label key={i} style={{marginRight: '2px', marginLeft: '2px'}}>{s} <button value={s} onClick={(e) => {deleteItem(e.target.value)}}>x</button></label>
						)
					})}
        	<input name="tags" value={value} onChange={(e) => {setValue(e.target.value)}} onKeyDown={onKeyPressed} placeholder='태그를 입력 후 엔터를 눌러주세요!(최대 5개)' />
        </div>
        <div className="event-detail-item">
          <h3>운영 날짜</h3>
          <p className='event-submit-p'>
            <SemiCalendar d={eventData.startDate} onChangeDate={setStartCalendarDate}/> 
            &nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp; 
            <SemiCalendar d={eventData.endDate} onChangeDate={setEndCalendarDate}/>
          </p>
        </div>

        <div className="event-detail-item">
          <h3>운영 시간</h3>
          <p className='event-submit-p'>
          	<span>
	            <select className='event-submit-time' name='hour' onChange={setOTime}>
	            	{HOURS.map((e, i) => {
									return(
										<option key={i} value={e}>{e >= 10 ? e : '0' + e}</option>
									)
								})}
	            </select>:
	            <select className='event-submit-time' name='min' onChange={setOTime}>
	            	{MINS.map((e, i) => {
									return(
										<option key={i} value={e}>{e >= 10 ? e : '0' + e}</option>
									)
								})}
	            </select>
          	</span>
            &nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp; 
            <span>
	            <select className='event-submit-time' name='hour' onChange={setCTime}>
	            	{HOURS.map((e, i) => {
									return(
										<option key={i} value={e}>{e >= 10 ? e : '0' + e}</option>
									)
								})}
	            </select>:
	            <select className='event-submit-time' name='min' onChange={setCTime}>
	            	{MINS.map((e, i) => {
									return(
										<option key={i} value={e}>{e >= 10 ? e : '0' + e}</option>
									)
								})}
	            </select>
          	</span>
          </p>
        </div>

        <div className="event-detail-item">
          <h3>상세 정보</h3>
          <p contentEditable={true} 
	          onInput={contentChange} 
	          style={{backgroundColor:'beige'}}>
          	{hashedContent() }
          </p>
          <span>{cLen}/4000bytes</span>
        </div>

        <div className="event-detail-item">
		<h3>위치</h3>
            <input
                type="text"
                id="searchAddress"
                value={address}
                placeholder="주소를 입력해주세요"
                readOnly
                style={{
                    width: '70%',
                    padding: '8px',
                    fontSize: '14px',
                    marginRight: '10px',
                }}
            />
            <button
                onClick={searchAddress}
                style={{
                    padding: '8px 16px',
                    backgroundColor: '#f06565',
                    color: '#fff',
                    border: 'none',
                    cursor: 'pointer',
                }}
            >
                주소 검색
            </button>
            <div
                id="map"
                style={{
                    width: '100%',
                    height: '350px',
                    marginTop: '10px',
                    display: 'none',
                }}
            ></div>
        </div>

        <div className="event-detail-item">
          <h3>안내 및 주의사항</h3>
          <textarea 
          	value={alert}
          	onChange={(e) => {setAlert(e.target.value)}}
          >
          	
          </textarea>
        </div>
	      <button onClick={submitData}>등록</button>
      </div>
    </div>
  );
}

export default EventEdit;
