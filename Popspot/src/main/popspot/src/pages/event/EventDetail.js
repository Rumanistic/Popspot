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
} from '../styles/EventDetailStyle';
import KakaoMap from '../component/Map';
import ViewsCount from '../component/ViewsCount';

function EventDetail() {
  const { no } = useParams();
  const [event, setEvent] = useState(null);
  const [reviews, setReviews] = useState(null);
  const [tab, setTab] = useState('info'); // 현재 탭 상태 관리
  const navigate = useNavigate();
  const [likeNo, setLikeNo] = useState(null);
  const userId = sessionStorage.userId || '';
  const [likes, setLikes] = useState(false);

  useEffect(() => {
    axios
      .get(`/api/event/${no}`)
      .then((result) => {
        setEvent(result.data.event);
        setReviews(result.data.review);
        axios
          .get(`/api/redis/views/${no}/increment`)
          .then((result) => console.log('조회수 증가 완료', result.data))
          .catch((err) => console.log('조회수 증가 실패', err));
      })
      .catch((err) => console.error('이벤트 정보를 불러오는 중 오류가 발생했습니다.', err));

    axios
      .get(`/api/event/like/${no}`)
      .then((result) => setLikeNo(result.data))
      .catch((err) => console.error('좋아요 수를 불러오는 중 오류가 발생했습니다.', err));

    axios
      .get(`/api/event/like/${no}/${userId}`)
      .then((result) => setLikes(result.data))
      .catch((err) => console.error('좋아요 상태를 불러오는 중 오류가 발생했습니다.', err));
  }, [no, userId]);

  const doDelete = () => {
    const confirmDelete = window.confirm('삭제하시겠습니까?');
    if (confirmDelete) {
      axios.delete(`/api/event/${no}`).then((result) => {
        alert('삭제되었습니다 !');
        navigate('/popup');
      }).catch((error) => {
        console.error('삭제 중 오류가 발생했습니다.', error);
        alert('삭제에 실패했습니다.');
      });
    }
  };
  
  const doEdit = () => {
    navigate('/popup/edit', { state: { event } });
  };

  const like = () => {
    if (userId !== '') {
      axios.post(`/api/event/like/${no}/${userId}`).then(() => {
        setLikes((p) => !p);
        setLikeNo((p) => (likes ? p - 1 : p + 1));
      });
    }
  };

  return (
    <div>
      {event ? (
        <EventContainer>
          <EventTitle>{event.title}</EventTitle>
           <SetParagraph content={event.content} company={event.company} createdDate={event.createdDate} images={event.images} />
          <span
            onClick={like}
            style={{
              cursor: 'pointer',
              fontSize: '24px',
              color: likes ? 'red' : 'gray'
            }}
          >
            {likes ? '❤️' : '🩶'}
          </span>
          <span>{likeNo === 0 ? null : likeNo}</span>
          <ViewsCount no={no} />
			<div>
          {event.userId === userId ? <Button onClick={() => doEdit()}> 수정 </Button> : <></>}
          &nbsp; &nbsp;
          {event.userId === userId ? <Button onClick={doDelete}> 삭제 </Button> : <></>}
			</div>
          {/* 탭 전환 버튼 */}
          <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
            <div
              onClick={() => setTab('info')}
              style={{
                cursor: 'pointer',
                padding: '10px 20px',
                borderBottom: tab === 'info' ? '3px solid #006EB9' : 'none',
                color: tab === 'info' ? '#006EB9' : '#555',
                fontWeight: tab === 'info' ? 'bold' : 'normal'
              }}
            >
              정보
            </div>
            <div
              onClick={() => setTab('review')}
              style={{
                cursor: 'pointer',
                padding: '10px 20px',
                borderBottom: tab === 'review' ? '3px solid #006EB9' : 'none',
                color: tab === 'review' ? '#006EB9' : '#555',
                fontWeight: tab === 'review' ? 'bold' : 'normal'
              }}
            >
              리뷰
            </div>
          </div>

          {/* 탭 내용 */}
          {tab === 'info' && (
            <>
              <EventDetailItem>
                <EventHeading>운영 날짜</EventHeading>
                <EventParagraph>
                  {event.startDate} - {event.endDate}
                </EventParagraph>
              </EventDetailItem>

              <EventDetailItem>
                <EventHeading>운영 시간</EventHeading>
                <EventParagraph>
                  {event.openTime.substring(0, 5)} ~ {event.closeTime.substring(0, 5)}
                </EventParagraph>
              </EventDetailItem>
         <SetConent content={event.content}/>
             
              <EventDetailItem>
                <EventHeading>위치</EventHeading>
                <EventLocation>
                  📍{event.address}
                  <br />
                  <KakaoMap lat={event.lat} lon={event.lon} address={event.address} />
                </EventLocation>
              </EventDetailItem>
            </>
          )}

          {tab === 'review' && <Review eventNo={event.eventNo} eventTitle={event.title} reviews={reviews} />}
        </EventContainer>
      ) : (
        <p>이벤트 정보를 찾을 수 없습니다.</p>
      )}
    </div>
  );
}

const SetParagraph = ({content, company, createdDate, images}) => {
   const text = content;
   const splitText = text.split(/<(?:\/)?[a-zA-Z][^>]*>/).filter(list => !/\[alert\](?:!\s\w)*[가-힣]*(?:\s[가-힣]*)*/.test(list));
   const hyphenRemover = /-/g;
   
   const checkDir = (createdDate) => {
      const date = createdDate.replace(hyphenRemover, '');
      
      return date.substring(0,8);
   }
   
   return (
      <EventDetailItem>
               <EventImages src={`/img/${company}${checkDir(createdDate)}/${images}.png`} alt='' />
      </EventDetailItem>
   )
}

const SetConent = ({content}) =>{
   const text = content;
   const splitText = text.split(/<(?:\/)?[a-zA-Z][^>]*>/).filter(list => !/\[alert\](?:!\s\w)*[가-힣]*(?:\s[가-힣]*)*/.test(list));

   
   return (
      <EventDetailItem>
         <EventHeading>상세 정보</EventHeading>
         {splitText.map((e, i) => {return (
                  <EventParagraph key={i}>{e}</EventParagraph>
         )})}
      </EventDetailItem>
   )
}

export default EventDetail;
