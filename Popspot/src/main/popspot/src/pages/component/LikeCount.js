import axios from "axios";
import { useEffect, useState } from "react";

function LikeCount ({no,userId}){
	const [likes,setLikes] = useState(false);
useEffect(()=>{
	axios.get(`/api/event/like/${no}/${userId}`)
	 	.then(result => {setLikes(result.data)})
	 	.catch( err => console.error("좋아요 상태를 불러오는 중 오류가 발생했습니다.",err));
},[])

	 	
	 	return(
			 <>
			 	<span  style={{
          cursor: 'pointer',
          fontSize: '24px',
          color: likes ? 'red' : 'gray', // 좋아요 여부에 따라 색상 변경
        }} >
         {likes ? '❤️' : '🩶'}
        </span>
			 </>
		 )
}

export default LikeCount;


