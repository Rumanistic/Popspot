import { useEffect, useState } from "react";
import { ContentContainer, ContentDetailBody, ContentHorizontalBar, label } from "../styles/UserSupportStyle";
import { useParams } from "react-router-dom";
import axios from "axios";
import { RightFloatSpan } from "../styles/FaqStyle";

const userPermissions = sessionStorage.getItem('permissions') || '';
const userId = sessionStorage.getItem('userId');
const userData = {userId, userPermissions}

function UserSupportDetail() {
	const [width, setWidth] = useState(window.innerWidth);
	const [supportData, setSupportData] = useState({
		inquiryNo: 0,
		userId: '',
		inqTitle: '',
		inqContent: '',
		type: 0,
		inqCreatedDate: '',
		reply: '',
		adminId: '',
		replyCreatedDate: ''
	})
	const {no} = useParams();
	const [state, setState] = useState(false);
	
	const isAdmin = userData.userPermissions.includes("admin");
	
	console.log('reached here successfully!')
	
	useEffect(() => {
		const getNowWidth = () => {
			setWidth(window.innerWidth)
		};
		
		window.addEventListener('resize', getNowWidth);
		
		return () => {
			window.removeEventListener('resize', getNowWidth);
		}
	})
	
	useEffect(() => {
		axios.get(`/api/support/user-support/${no}`).then(result => {
			const inquiry = result.data.inquiry;
			const reply = result.data.reply;
			
			setSupportData({
				...supportData,
				inquiryNo: inquiry.inquiryNo,
				userId: inquiry.userId,
				inquiryCreatedDate: inquiry.createdDate,
				inqContent: inquiry.inqContent,
				inqTitle: inquiry.inqTitle,
				type: inquiry.type,
				...(reply && reply !== '' ? {
					reply: reply.reply,
			    adminId: reply.userId,
			    answeredDate: reply.createdDate
				} : {})
			})
		})
	}, [no])
	
	const stateChange = () => {
		setState(!state);
	}
	
	
	return (
		<ContentContainer width={width}>
			<ContentHorizontalBar borderpixel={3}/>
				<ContentDetailBody>
				{console.log(supportData)}
					<p><label>제목 : </label><span>{supportData.inqTitle}</span></p>
					<ContentHorizontalBar width={'80%'}/>
					<p><label>분류 : </label> <span>{supportData.type}</span></p>
					<ContentHorizontalBar width={'80%'}/>
					<span><p>{supportData.inqContent}</p></span>
				</ContentDetailBody>
				{supportData.reply !== '' ? <ReplyData supportData={supportData}/> : 
					isAdmin &&
					(<RightFloatSpan>
						{!state ? <button onClick={stateChange}>문의사항 답변 등록</button> : <span />}
					</RightFloatSpan>)
				}
				
				
				<RegisterAnswer state={state} supportNo={supportData.inquiryNo} reply={supportData.reply} stateChange={stateChange} userId={userId}/>
			<ContentHorizontalBar borderpixel={3}/>
		</ContentContainer>
	)
}

function RegisterAnswer({state, supportNo, reply, stateChange, userId}) {
	const [newReply, setNewReply] = useState(reply);
	
	const dataChange = (e) => {
		const data = e.target.innerHTML;
		console.log(data);
		setNewReply(data);
	}
	
	const answerSubmit = () => {
		console.log("등록이벤트");
		console.log("등록한 답변:", newReply);
		axios.post(`/api/support/user-support/${supportNo}/reply`, {
	    reply: newReply,
	    inquiryNo: supportNo,
	    userId
		}, {
	    headers: {
	        'Content-Type': 'application/json; charset=UTF-8'  // UTF-8 설정
	    }
		})
		stateChange();
	}
	
	return (
			state ? 
			(<span> 
				<p contentEditable={true} onInput={dataChange}>type here</p>
				<button onClick={() => answerSubmit()}>문의사항 답변 등록!</button>
			</span>) : (<span />)
	);
}

function ReplyData({supportData}) {
	return (
		<>
			{
				<p>{supportData.reply}</p>
			}
		</>
	);
}

export default UserSupportDetail;