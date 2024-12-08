import axios from "axios";
import { useEffect, useState } from "react";

function ViewsCount ({no}){
	const [ViewsCount,setViews] = useState(0);

useEffect(()=>{
	axios.get(`/api/Redis/${no}`)
	 	.then(result => {
			console.log("현재 이벤트 조회수 ",result.data )
			setViews(result.data.data)}
	)
	 	.catch( err => console.error("현재 조회수를 불러오지 못했습니다.",err));
},[])
	 	
	 	return(
			 <>
			<span> 👁️ {ViewsCount} 조회  </span>
			 </>
		 )
}

export default ViewsCount;
