import { useEffect, useRef, useState } from "react";
import { useNavigate} from 'react-router-dom';
import { ContentContainer, ContentHorizontalBar, ContentHorizontalSpan, ContentVerticalSpan } from "../styles/UserSupportRegisterStyle";
import { RightFloatSpan } from "../styles/FaqStyle";
import axios from 'axios';
import { 
  TitleInput,
  SelectType,
  Label,
  CheckboxLabel,
  SecretCheckbox,
  SubmitResetButtons,
  Textarea
} from "../styles/UserSupportRegisterStyle";

function UserSupportRegister() {
	const [width, setWidth] = useState(window.innerWidth);
	const navigate = useNavigate();
	
	// 글 작성 시 빠진 항목 포커스를 위한 input ref 생성
	const titleRef =useRef(null);
	
	const [inquiryData, setInquiryData] = useState({
		userId: sessionStorage.getItem('userId'),
		userName: sessionStorage.getItem('name'),
		inqTitle: '',
		type: 1,
		inqContent: '',
		secret: 0
	})
	
	useEffect(() => {
		const getNowWidth = () => {
			setWidth(window.innerWidth)
		};
		
		window.addEventListener('resize', getNowWidth);
		
		return () => {
			window.removeEventListener('resize', getNowWidth);
		}
	})
	
	const dataChange = (e) => {
		console.log(inquiryData);
		if(e.target.value === 'on'){
			if(inquiryData.secret === 1){
				setInquiryData({
					...inquiryData,
					secret: 0
				})
				return;
			}
			
			setInquiryData({
					...inquiryData,
					secret: 1
			})
		}
			
		if(e.target.name !== 'secret'){
			setInquiryData({
				...inquiryData,
				[e.target.name]: e.target.value
			})
		}
	}

	const submitData = () => {
		
		// 전송할 데이터를 업데이트하면서 새 변수에 담음
		setInquiryData(
			(inquiryData) => {
				// 전송할 변수 submitData 생성
				const submitData = {
				...inquiryData
			};
		
			// axios를 실행할 doSubmit(전송할 데이터)
			console.log(submitData);
			doSubmit(submitData);
		})
	}
	
	 const handleCancel = () => { navigate('/support/usersupport'); };
		
	function doSubmit(submitData) {
		
		axios
			.post('/api/support/user-support/submit', submitData, {
				headers: {
					"Content-Type": "application/json"
				}
			})
			.then(result => {
				console.log(result);
				navigate('/support/usersupport');
			});
	}
	
	return (
	    <ContentContainer width={width}>
	      <ContentHorizontalBar borderpixel={4} style={{marginBottom: '5px', marginTop: '-10px'}}/>
	         <h2>1:1 문의사항 등록</h2>
	      <ContentHorizontalBar width={'85%'} borderpixel={1} />
		  
	      <ContentHorizontalSpan>
	       	 <Label>문의사항</Label>
	       	 <TitleInput ref={titleRef} name="inqTitle" placeholder="문의하실 내용을 간략하게 정리해주세요." onChange={dataChange} 
			 							style={{ borderColor: '#006EB9', marginBottom: '30px'}}/>
	      </ContentHorizontalSpan>
	      <ContentHorizontalSpan>
	         <Label>종류</Label>
	        <SelectType name="type" onChange={dataChange} style={{borderColor: '#006EB9', marginBottom: '30px'}}>
	          <option value={1}>&ensp;로그인</option>
	          <option value={2}>&ensp;회원가입</option>
	          <option value={9}>&ensp;기타</option>
	        </SelectType>
	      </ContentHorizontalSpan>
		  
	      <ContentHorizontalSpan>
	         <Label>문의 내용</Label>
	         <Textarea
                name="inqContent"
                onChange={dataChange}
                rows="5"
                required
	         ></Textarea>
	      <ContentHorizontalSpan>
	  
	          <CheckboxLabel>비밀글 등록</CheckboxLabel>
	          <SecretCheckbox name="secret" type="checkbox" onChange={dataChange} />
	          
	      </ContentHorizontalSpan>
	      
	      </ContentHorizontalSpan>
		  
	      <ContentHorizontalBar width={'85%'} borderpixel={1} />
	      	<SubmitResetButtons>
			   <input type="submit" value="등록" onClick={submitData} 
			   		  style={{backgroundColor: '#006EB9', color: 'white', borderRadius:'0px', marginLeft: '800px', padding:'4px'}}/>
			   <input type="reset" value="취소" onClick={handleCancel} 
			   		  style={{backgroundColor: 'white', color: '#006EB9', borderColor:'#006EB9', borderRadius:'0px', padding:'4px'}}/>
	 		</SubmitResetButtons>
	    </ContentContainer>
	  );
	}


export default UserSupportRegister;