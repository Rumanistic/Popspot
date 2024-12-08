import { useEffect, useState } from "react";
import { ContentContainer, ContentHorizontalBar, ContentHorizontalSpan, ContentVerticalSpan } from '../styles/UserSupportStyle';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { RightFloatSpan } from "../styles/FaqStyle";


function UserSupport() {
	const [width, setWidth] = useState(window.innerWidth);
	const userId = sessionStorage.getItem('userId') || '';
	const userPermission = sessionStorage.getItem('permissions') || '';
	
	useEffect(() => {
		const getNowWidth = () => {
			setWidth(window.innerWidth)
		};
		
		window.addEventListener('resize', getNowWidth);
		
		return () => {
			window.removeEventListener('resize', getNowWidth);
		}
	})
	
	
	
	return (
		<ContentContainer width={width}>
			<ContentVerticalSpan>
				<ContentHorizontalBar width={'95%'} borderpixel={2} />				
					<UserSupportList userId={userId} userPermission={userPermission}/>
				<ContentHorizontalBar width={'95%'} borderpixel={2} />
			</ContentVerticalSpan>
		</ContentContainer>
	)
}

function UserSupportList({userId, userPermission}) {
	const [sList, setSList] = useState([]);
	
	useEffect(() => {
		axios
			.get('/api/support/user-support')
			.then(response => setSList(response.data));
	}, []);
	
	const navigate = useNavigate(); 
	
	return (
		<ContentVerticalSpan style={{alignItems: 'center'}}>
			<h2 style={{margin: '0 auto'}}>1:1 고객 문의</h2>
			<RightFloatSpan>
			{userId !== null ?
					<input 
						type="button" 
						value={"문의사항 등록"}
						style={{backgroundColor: '#006EB9',
								color: 'white',
								fontSize:'15px',  
								padding: '5px',
								marginLeft: '800px', 
								borderColor: 'transparent'			
						      }}					
						onClick={() => navigate('/support/usersupport/register')}
					/>:
					<span style={{color: '#000'}}>로그인 후에 문의 가능합니다!</span> 
			}
			</RightFloatSpan>				
			<ContentHorizontalBar width={'100%'} borderpixel={2} />
			{sList.map((e, i) => {
				if(e.secret !== 1){
					return (
						<ContentHorizontalSpan key={i} redirect={'y'} onClick={() => navigate(`/support/usersupport/detail/${e.supportNo}`)}>
							<span className="no">{sList.length - i}</span>
							<span className="type">{getType(e.type)}</span>
							<span className="secret"/>
							<span className="userId">{e.userId}</span>
							<span className="title">{e.title}</span>
						</ContentHorizontalSpan>
					);
				}
				
				if(e.userId === userId || userPermission.includes('admin')){
					return(
						<ContentHorizontalSpan key={i} redirect={'y'} onClick={() => navigate(`/support/usersupport/detail/${e.supportNo}`)}>
							<span className="no">{sList.length - i}</span>
							<span className="type">{getType(e.type)}</span>
							<span className="secret"> 🔓 </span>
							<span className="userId">{e.userId}</span>
							<span className="title">{e.title}</span>
						</ContentHorizontalSpan>
					);
				}
				
				return (
					<ContentHorizontalSpan redirect={'n'}>
						<span className="no">{i+1}</span>
						<span className="type">{getType(e.type)}</span>
						<span className="secret"> 🔒 </span>
						<span className="userId">{e.userId}</span>
						<span className="title">비공개 문의사항입니다.</span>
					</ContentHorizontalSpan>
				)
			})}
		</ContentVerticalSpan>
	)
}

function getType(type){
	switch(type){
		case 1:
			return '로그인';
		case 2:
			return '회원가입';
		default:
			return '기타'
	}
}


export default UserSupport;