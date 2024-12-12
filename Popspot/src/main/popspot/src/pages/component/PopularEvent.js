import axios from "axios";
import { useEffect, useState } from "react";

// number에는 top 몇개를 보여 줄건지  입력하면됨
function PopularEvent ({number}){
	const [PopularEventList,setEventList] = useState([]);

useEffect(()=>{
	axios.get(`/api/redis/views/top/${number}`)
	 	.then(result => {
			console.log("현재 조회수 상위 목록 리스트  ",result.data )
			setEventList(result.data.data)}   
	)
	 	.catch( err => console.error("현재 조회수를 불러오지 못했습니다.",err));
},[])
	 	
	 	return(
			 <>
			<span> 👁️ {ViewsCount} 조회  </span>
			 </>
		 )
}

export default PopularEvent;
