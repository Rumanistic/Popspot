import React, { useEffect, useState } from "react";
import Datetime from 'react-datetime';
import './SemiCalendar.css';

const SemiCalendar = ({d, onChangeDate}) => {
	const [date, setDate] = useState(d || '');
	const [open, setOpen] = useState(false);
	const format = 'YYYY-MM-DD';
	
	const getSeparator = () => {
		const regex = /[^0-9a-zA-z]+/;
		const match = format.match(regex);
		
		if(match){
			const symbol = match[0];
			const indexes = [];
			
			for(let i = 0; i < format.length; i++){
				if(format[i] === symbol){
					indexes.push(i);
				}
			}
			
			return {symbol, indexes};
		}
		return {symbol: undefined, indexes: []};
	};
	
	const separator = getSeparator();
	
	const changeDate = (e) => {
		let curDate = e.target.value;
		console.log(e.target);
		
		if(separator.symbol && separator.indexes.length > 0){
			separator.indexes.forEach((index) => {
				if(curDate.length === index){
					curDate = curDate.slice(0, index) +
					separator.symbol +
					curDate.slice(index);
				}
			});
		}
		
		setDate(curDate);
		onChangeDate(curDate);
	};
	
	const clickButton = () => {
		setOpen(!open);
	}
	
	const changeCalendar = (selected) => {
		const formattedDate = selected.format(format);
		setDate(formattedDate);
		setOpen(false);
		onChangeDate(formattedDate);
	}
	
	useEffect(() => {
		if(d) {
			setDate(d);
		}
	}, [d]);
	
	return (
		<span>
			<span className="calendar-container">
			<input
				type='text'
				value={date}
				placeholder="yyyy-mm-dd"
				onChange={changeDate}
			/>
			<button type="button" onClick={clickButton} className="btn-icon">
				<img src="/calendar.png" alt="" />
			</button>
			</span>
			{open && (
				<Datetime
					input={false}
					timeFormat={false}
					dateFormat={format}
					value={date}
					onChange={changeCalendar}
					onClick={changeDate}
					className="datetime-widget"
				/>
			)}
		</span>
	)
}

export default SemiCalendar;