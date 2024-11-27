import { useState } from "react";
import * as ListStyle from "../styles/ListStyle";

function SetStarPoint() {
	const [hoverFill, setHoverFill] = useState(null);
	const [starValue, setStarValue] = useState(null);
	const [starImg, setStarImg] = useState('Empty')
	
	const mouseMoveHandler = (e) => {
		
		const {left, width} = e.target.getBoundingClientRect();
		const x = e.clientX;
		
		const side = x < left+width/2 ? 0.5 : 1;
		const img = x < left+width/2 ? 'Half' : 'Full';
		setHoverFill(side);
		setStarImg(img);
	}
	
	const mouseLeaveHandler = (e) => {
		const {left, width} = e.target.getBoundingClientRect();
		const x = e.clientX;
		
		x < left+width/2 ? (hoverFill > 0 ? setHoverFill(0.5) : setHoverFill(0)) : setHoverFill(1);
		const img = x < left+width/2 ? 'Empty' : 'Full';
		setStarImg(img);
	}
	
	const mouseClickHandler = () => {
		setStarValue(hoverFill);
		console.log(starValue);
	}
	
	return (
			<ListStyle.StarImg 
				src={`/img/${starImg}Star.png`} 
				alt="" 
				onMouseMove={mouseMoveHandler}
				onMouseLeave={mouseLeaveHandler}
				onClick={mouseClickHandler}
			/>
	)
}

export default SetStarPoint;