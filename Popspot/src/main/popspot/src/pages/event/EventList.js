import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import StarPoint from "../component/StarPoint";
import { 
  StyledMessage, 
  Col4, 
  EventCardSpan, 
  EventCardSpanImage, 
  ListContentContainer, 
  ListContentTag, 
  ListContentTagsContainer, 
  ListHeaderContainer, 
  ListHeaderContainerHead1, 
  StyledButton,
  StyledRegisterButton
} from "../styles/ListStyle";
import { RightFloatSpan } from "../styles/FaqStyle";
import LikeCount from "../component/LikeCount";
import ViewsCount from "../component/ViewsCount";

function EventList({ tag }) {
  const [list, setList] = useState({ eList: [], rPoint: {} });
  const [tags, setTags] = useState([]);
  
  const selectedTag = tag || '';
  const navigate = useNavigate();
  const location = useLocation();
  
  const userId = sessionStorage.getItem("userId");
  const userPermissions = sessionStorage.getItem("permissions");

  // Fetch data on component mount
  useEffect(() => {
    if (location.state) {
      setList(location.state);
      axios.get(`/api/event/tags`)
        .then(result => setTags(result.data));
      return;
    }

    if (selectedTag !== '') {
      axios.get(`/api/event/search/tags`, { params: { tags: selectedTag } })
        .then(result => setList(result.data));
    } else {
      axios.get(`/api/event/lists`)
        .then(result => setList(result.data));
    }

    axios.get(`/api/event/tags`)
      .then(result => setTags(result.data));
  }, [location.state, selectedTag]);

  return (
    <span>
      <ListHeaderContainer>
        <ListHeaderContainerHead1>Pop-up List</ListHeaderContainerHead1>
        {userPermissions !== null && userPermissions.includes("planner") && 
          <div style={{ marginRight: '5px' }}>
            <RightFloatSpan>
			<StyledRegisterButton onClick={() => navigate('/popup/submit')}>등록</StyledRegisterButton>
            </RightFloatSpan>
          </div>
        }
      </ListHeaderContainer>
      <ListContentContainer>
        <ShowTag tags={tags} setList={setList} location={location} />
        <ShowList list={list} />
      </ListContentContainer>
    </span>

  );
}

function ShowTag({ tags, setList, location }) {
  const [values, setValues] = useState(Array(tags.length).fill(false));
  const [selectedTags, setSelectedTags] = useState([]);

  const toggle = (e, i) => {
    const valueToggle = [...values];
    let selected = [...selectedTags];
    valueToggle[i] = !valueToggle[i];
    setValues(valueToggle);
    if (valueToggle[i]) {
      selected.push(e);
    } else {
      selected = selected.filter(queryTag => queryTag !== e);
    }
    setSelectedTags(selected);
  };

  const release = () => {
    setValues(Array(tags.length).fill(false));
    setSelectedTags([]);
  };

  useEffect(() => {
    const searchTags = selectedTags.filter(tag => tag !== '');
    if (searchTags.length === 0) {
      if (location.state) {
        setList(location.state);
      } else {
        axios.get(`/api/event/lists`).then(result => setList(result.data));
      }
    } else {
      axios.get('/api/event/search/tags', { params: { tags: searchTags.join(',') } })
        .then(result => setList(result.data));
    }
  }, [selectedTags, location.state]);

  return (
    <ListContentTagsContainer>
      <span style={{ position: "sticky", top: "130px" }}>
        <ListContentTag onClick={() => release()}>모든 태그 제거</ListContentTag>
        {tags.map((e, i) => (
          <ListContentTag key={i} onClick={() => toggle(e, i)} value={values[i]}>{e}</ListContentTag>
        ))}
      </span>
    </ListContentTagsContainer>
  );
}

function ShowList({ list }) {
	const { eList = [], rPoint = {} } = list; // 기본값 설정
	const navigate = useNavigate();
	const hyphenRemover = /-/g;
	const userId = sessionStorage.userId || "";
	const [cardCount, setCardCount] = useState(3); // 초기 카운트 설정
  
	// 날짜 형식 변환
	const checkDir = (createdDate) => {
	  const date = createdDate.replace(hyphenRemover, '');
	  return date.substring(0, 8);
	};
  
	// 더보기 버튼 클릭 핸들러
	const cardMore = () => {
	  setCardCount((prev) => prev + 3);
	};
  
	// eList가 비어있을 경우 메시지 출력
	if (!eList.length) {
	  return <StyledMessage>등록된 이벤트가 없습니다.</StyledMessage>;
	}
  
	// 모든 카드가 로드된 경우 더보기 버튼 숨김
	const noMoreItems = cardCount >= eList.length;
  
	return (
	  <div>
		<EventCardSpan>
		  {eList.slice(0, cardCount).map((e) => (
			<Col4 onClick={() => navigate(`/event/${e.eventNo}`)} key={e.eventNo}>
			  <EventCardSpanImage
				src={`/img/${e.images !== null && e.images !== '' ? e.images.split(',')[0] : 'default'}.jpg`}
				onError={(event) => {
				  event.target.src = `/img/${e.images !== null && e.images !== '' ? e.company + checkDir(e.createdDate) + '/' + e.images.split(',')[0] : 'default'}.png`;
				}}
				alt="Event Image"
			  />
			  <span>{e.title}</span>
			  <LikeCount no={e.eventNo} userId={userId} />
        <ViewsCount no={e.eventNo} />
			  <span>{e.address ? `📍 ${e.address}` : "주소 정보 없음"}</span>
			  <span>{e.startDate} ~ {e.endDate}</span>
			  <span style={{ display: 'flex', justifyContent: 'space-evenly' }}>
				{rPoint[e.eventNo] ? StarPoint(rPoint[e.eventNo]) : StarPoint(0.0)}
				<span style={{ marginLeft: '10px', alignSelf: 'center' }}>
				  {rPoint[e.eventNo]
					? `리뷰 평점 : ${rPoint[e.eventNo].toFixed(1)} / 5.0`
					: '등록된 리뷰가 없습니다.'}
				</span>
			  </span>
			</Col4>
		  ))}
		</EventCardSpan>
		<div style={{ textAlign: 'center', marginTop: '20px' }}>
		  {!noMoreItems ? (
			<StyledButton onClick={cardMore}>더보기</StyledButton>
		  ) : (
			<StyledMessage>마지막 페이지입니다</StyledMessage>
		  )}
		</div>
	  </div>
	);
  }
  
export default EventList;
