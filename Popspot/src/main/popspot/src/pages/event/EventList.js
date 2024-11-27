import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StarPoint from "../component/StarPoint";
import { Col12, Col4, EventCardSpan, EventCardSpanImage, EventListSpan, EventListSpanImage, ListContentContainer, ListContentTag, ListContentTagsContainer, ListHeaderContainer, ListHeaderContainerHead1, ViewChangeSpan, ViewChangeSpanContainer, ViewChangeSpanDot, ViewChangeSpanHamburger } from "../styles/ListStyle";
import { RightFloatSpan } from "../styles/FaqStyle";

function EventList({tag}) {
	const [list, setList] = useState({eList:[], rPoint: {}});
	const [tags, setTags] = useState([]);
	const [view, setView] = useState('list');
	
	const selectedTag = tag || '';
	
	const navigate = useNavigate();
	
	const userId = sessionStorage.getItem("userId");
	const userPermissions = sessionStorage.getItem("permissions");
	
	
	// 페이지 리스트 렌더링
	useEffect(() => {
		if(selectedTag !== ''){
			axios.get(`/api/event/search/tags`, {params: {tags: selectedTag}}).then(
					result => setList(result.data.data));
		}else {
			axios.get(`/api/event/lists`)
					 .then(result => setList(result.data.data));			
		}
		axios.get(`/api/event/tags`)
				 .then(result => {
					 	setTags(result.data.data)
					 });
	}, [])
	
	// 페이지 표시 형태 변경(list <-> card)
	const viewToggleHandler = () => {
		setView(view === 'list' ? 'card': 'list')
	}

	/*
		리턴
		<>
			<리스트 헤더 영역>
				<리스트 헤드1 />
				<리스트 스팬 영역>
					<리스트 표시 형태 변경 span />
				</리스트 스팬 영역>
			</리스트 헤더 영역>
			<리스트 컨텐츠 영역>
				{태그 어사이드}
				{컨텐츠 리스트}
			</리스트 콘텐츠 영역>
			<관리 div>
				<우측정렬 span>
					<CRUD 버튼 />
				</우측정렬 span>
			</관리 div>
		</>
	*/
	return (
		<span>
			<ListHeaderContainer>
				<ListHeaderContainerHead1>Pop-up List</ListHeaderContainerHead1>
				{userPermissions !== null && userPermissions.includes("planner") ? 
				<div style={{marginRight: '5px'}}>
					<RightFloatSpan>
						<button onClick={() => {navigate('/popup/submit')}}>등록</button>
					</RightFloatSpan>
				</div> : 
				 null}
				<ViewChangeSpanContainer onClick={viewToggleHandler} islistview={view}>
					<ViewChangeSpan islistview={view}/>
					<ViewChangeSpanHamburger islistview={view}/>
					<ViewChangeSpanDot islistview={view}/>
				</ViewChangeSpanContainer>
			</ListHeaderContainer>
			<ListContentContainer>
				<ShowTag tags={tags} setList={setList} />
				<ShowList list={list} view={view} />
			</ListContentContainer>
		</span>
  );
}


function ShowTag({tags, setList}){

	// 태그 값 초기화
	const [values, setValues] = useState(Array(tags.length).fill(false));
	const [selectedTags, setSelectedTags] = useState([]);
	
	// 태그 선택 시 값 토글
	const toggle = (e, i) => {
		const valueToggle = [...values];
		let selected = [...selectedTags];
		valueToggle[i] = !valueToggle[i];
		setValues(valueToggle);
		if(valueToggle[i]){
			selected.push(e);
		} else {
			selected = selected.filter((queryTag)=> queryTag !== e);
			console.log(selected);
		}
		setSelectedTags(selected);
	}
	
	// 태그 전체 해제 시 값 초기화
	const release = () => {
		const releaseToggle = Array(tags.length).fill(false);
		const releaseSelected = [];
		setValues(releaseToggle);
		setSelectedTags(releaseSelected);
	}
	
	
	useEffect(() => {
		const searchTags = selectedTags.filter(tag => tag !== '');
		if(searchTags.length === 0){
			axios.get(`/api/event/lists`).then(
				result => setList(result.data.data))
		}
		else {
			if (searchTags.length === 1){
				axios.get('/api/event/search/tags', {params: {tags: searchTags.join('')}}).then(
					result => setList(result.data.data));
			}
			else {
				axios.get('/api/event/search/tags', {params: {tags: searchTags.join(',')}}).then(
					result => setList(result.data.data));
			}
		}
	}, [selectedTags])
	
	
	return (
		<ListContentTagsContainer>
			<span style={{position: "sticky", top: "130px"}}>
			{<ListContentTag onClick={() => release()}>모든 태그 제거</ListContentTag>}
			{tags.map((e, i) => {
				return (<ListContentTag key={i} onClick={() => toggle(e, i)} value={values[i]}>{e}</ListContentTag>)
			})}
			</span>
		</ListContentTagsContainer>
	)
}


function ShowList({list, view}){
	const {eList, rPoint} = list;
	const navigate = useNavigate();
	const hyphenRemover = /-/g;
	
	const contentRegex = (content) => {
		const tagRemover = /<[^>]*>/g;
		const imgRemover = /image[0-9]+/g;
		const alertRemover = /\[alert\](?:!\s\w)*[가-힣]*(?:\s[가-힣]*)*/g;
		
		content = content.replace(tagRemover, '').replace(imgRemover, '').replace(alertRemover, '');
		return (
			<span>{content.length > 200 ? `${content.substring(0, 200)}...` : content}</span>
		)
	}
	
	const checkDir = (createdDate) => {
		const date = createdDate.replace(hyphenRemover, '');
		
		return date.substring(0,8);
	}
	

	
	// eslint-disable-next-line default-case
	switch(view){
		case 'list':
			return (
				<EventListSpan>
					{eList.map((e, i) => {
						return(
							<Col12 onClick={() => {navigate(`/event/${e.eventNo}`)}} key={e.eventNo}>
								<span style={{alignSelf: "center", maxwidth: "400px", minWidth: "400px"}}>
									<EventListSpanImage src={`/img/${
										e.images !== null && e.images !== '' ? 
												(e.images.split(','))[0] :
												'FullStar'
									}.jpg`}
									onError={(event) => {
										console.log(`png 이미지로 로드중...`);
										event.target.src = `/img/${e.company}${checkDir(e.createdDate)}/${
	                        e.images !== null && e.images !== '' ? e.images.split(',')[0] : 'FullStar'
	                      }.png`;
									}} 
									alt=""/>
								</span>
								<span style={{margin: "10px 0", width: "55%", display:"flex", flexDirection: "column", justifyContent: "space-between"}}>
									<span>{e.title}</span>
									<span>{contentRegex(e.content)}</span>&emsp;
								</span>&emsp;
								<span style={{display: 'flex', flexFlow: 'column', justifyContent:'center'}}>
								<span style={{alignSelf: "center"}}>{rPoint[e.eventNo] ? 
								  StarPoint(rPoint[e.eventNo]) 
								  : StarPoint(0.0)}
								  </span>
								  <span style={{alignSelf:'center'}}>{rPoint[e.eventNo] ? `리뷰 평점 : ${rPoint[e.eventNo].toFixed(1)} / 5.0` : '등록된 리뷰가 없습니다.'}</span> 
								</span>
							</Col12>
						)
					})}
				</EventListSpan>
			)
		case 'card':
			return (
				<EventCardSpan>
					{eList.map((e, i) => {
						let no = e.eventNo;
						return(
							<Col4 onClick={() => {navigate(`/event/${no}`)}} key={e.eventNo}>
								<span>{e.title}</span>&emsp;
								<span><EventCardSpanImage src={`/img/${
									e.images !== null && e.images !== '' ? 
											(e.images.split(','))[0] :
											'FullStar'
								}.jpg`}
								onError={(event) => {
									console.log(`png 이미지로 로드중...`);
									event.target.src = `/img/${e.company}${checkDir(e.createdDate)}/${
                        e.images !== null && e.images !== '' ? e.images.split(',')[0] : 'FullStar'
                      }.png`;
								}} 
								alt="" style={{width: '10%'}}/></span>
								<span>{contentRegex(e.content)}</span>&emsp;
								<span style={{display:'flex', justifyContent: 'space-evenly'}}>
									{rPoint[e.eventNo] ? 
								  	StarPoint(rPoint[e.eventNo])
								  	: StarPoint(0.0)}
								  	<span style={{marginLeft:'10px', alignSelf:'center'}}>{rPoint[e.eventNo] ? `리뷰 평점 : ${rPoint[e.eventNo].toFixed(1)} / 5.0` : '등록된 리뷰가 없습니다.'}</span> 
							  </span>
							</Col4>
						)
					})}
				</EventCardSpan>
			)
	}
	
}

export default EventList;