import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Review from './Review';
import {
  EventContainer,
  EventTitle,
  EventDetailItem,
  EventHeading,
  EventParagraph,
  EventLocation,
  EventImages,
  Button
} from '../styles/EventDetailStyle'; // 여기에 폰트가 설정되어 있음
import KakaoMap from '../component/Map';
import ViewsCount from '../component/ViewsCount';

function EventDetail() {
  const { no } = useParams(); // URL에서 이벤트 번호를 가져옴
  const [event, setEvent] = useState(null);
  const [reviews, setReviews] = useState(null);
  const navigate = useNavigate();
  const [likeNo,setLikeNo] = useState(null);
  const	userId = sessionStorage.userId||"";
  
  const [likes,setLikes] = useState(false);
  useEffect(() => {
	
    axios.get(`/api/event/${no}`)
      .then(result => {
			setEvent(result.data.event);
		  	setReviews(result.data.review);
        axios.get(`/api/Redis/views/${no}/increment`).then(
          result =>{
            console.log("조회수 증가 완료", result.data)
          }
        ).catch(
          console.log("조회수 증가 실패", result.data)
        )
		  })
      .catch(err => console.error('이벤트 정보를 불러오는 중 오류가 발생했습니다.', err));
      
      //좋아요 수 불러오기
    axios.get(`/api/event/like/${no}`)
    .then(result =>{
		setLikeNo(result.data)
	})
	.catch( err => console.error("좋아요 수를 불러오는 중 오류가 발생했습니다.",err));
	//좋아요 상태 체크
	 axios.get(`/api/event/like/${no}/${userId}`)
	 .then(result => {setLikes(result.data)})
	 .catch( err => console.error("좋아요 상태를 불러오는 중 오류가 발생했습니다.",err));
	 
  }, [no,userId]);
  
  
  
  
  const doDelete = () => {
		axios.delete(`/api/event/${no}`)
			.then(result => {alert(result.data.msg);
				navigate("/popup");
			})
	}
	
	const doEdit = () => {
		navigate('/popup/edit', {state: {event}})
	}

  const like = () => {
	  if(userId!==""){
	 axios.post(`/api/event/like/${no}/${userId}`)
	 .then(()=>{
		 setLikes(p =>!p)
		 setLikeNo(p =>likes ? p-1 : p+1 )
	 })}
  }

  return (
    <div>
      {event ? (
        <EventContainer>
          {/* 이미지 출력 */}
          <EventTitle>{event.title}</EventTitle>
          <span
        onClick={like}
        style={{
          cursor: 'pointer',
          fontSize: '24px',
          color: likes ? 'red' : 'gray', // 좋아요 여부에 따라 색상 변경
        }}
      >
        {likes ? '❤️' : '🩶'}
         </span><span>{likeNo==0 ? null:likeNo}</span>
         
        <ViewsCount no={no}/>
        
     
          {event.userId === userId ? <Button onClick={() => doEdit()}> 수정 </Button> : <></>}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          {event.userId === userId ? <Button onClick={doDelete}> 삭제 </Button> : <></>}
          <EventDetailItem>
            <EventHeading>운영 날짜</EventHeading>
            <EventParagraph>{event.startDate} - {event.endDate}</EventParagraph>
          </EventDetailItem>

          <EventDetailItem>
            <EventHeading>운영 시간</EventHeading>
            <EventParagraph>{event.openTime.substring(0,5)} ~ {event.closeTime.substring(0,5)}</EventParagraph>
          </EventDetailItem>

          <SetParagraph content={event.content} company={event.company} createdDate={event.createdDate} />

          <EventDetailItem>
            <EventHeading>위치</EventHeading>
            <EventLocation>📍{event.address}<br /><KakaoMap lat={event.lat} lon={event.lon} address={event.address}/></EventLocation>
          </EventDetailItem>

          <EventDetailItem>
            <EventHeading>안내 및 주의사항</EventHeading>
            <EventParagraph>❗모든 상품은 품절시 조기종료 될 수 있습니다❗</EventParagraph>
          </EventDetailItem>

          <Review eventNo={event.eventNo} eventTitle={event.title} reviews={reviews} />
        </EventContainer>
      ) : (
        <p>이벤트 정보를 찾을 수 없습니다.</p>
      )}
    </div>
  );
}

const SetParagraph = ({content, company, createdDate}) => {
	const text = content;
	const splitText = text.split(/<(?:\/)?[a-zA-Z][^>]*>/).filter(list => !/\[alert\](?:!\s\w)*[가-힣]*(?:\s[가-힣]*)*/.test(list));
	const imgRegex = /^image[0-9]*/;
	const hyphenRemover = /-/g;
	
	const checkDir = (createdDate) => {
		const date = createdDate.replace(hyphenRemover, '');
		
		return date.substring(0,8);
	}
	
	return (
		<EventDetailItem>
			<EventHeading>상세 정보</EventHeading>
			{splitText.map((e, i) => {return (
				imgRegex.test(e) ? 
					<EventImages src={`/img/${company}${checkDir(createdDate)}/${company}_${e.substring(5)}.png`} alt='' key={i}/>:
						<EventParagraph key={i}>{e}</EventParagraph>
			)})}
		</EventDetailItem>
	)
}

export default EventDetail;