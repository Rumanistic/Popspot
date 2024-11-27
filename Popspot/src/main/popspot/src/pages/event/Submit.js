import React, { useState }from 'react';
import './Submit.css';
import axios from 'axios'; // axios를 import하여 API 요청에 사용

const Submit = () => {
    const [event, setEvent] = useState({
        eventNumber: '',
        id: '',
        name: '',
        title: '',
        businessName: '',
        content: '',
        startDate: '',
        endDate: '',
        openingHours: '',
        closingHours: '',
        eventType: '',
        tags: '',
        creationDate: '',
        isDeleted: false,
        deletionDate: ''
    });




    const handleChange = (e) => {
        const { name, value } = e.target;
        setEvent((prevEvent) => ({
            ...prevEvent,
            [name]: value
        }));
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        
        // 콘솔에 각 입력값 출력
        console.log('행사 번호:', event.eventNumber);
        console.log('아이디:', event.id);
        console.log('이름:', event.name);
        console.log('제목:', event.title);
        console.log('사업체명:', event.businessName);
        console.log('내용:', event.content);
        console.log('시작일:', event.startDate);
        console.log('종료일:', event.endDate);
        console.log('개장 시간:', event.openingHours);
        console.log('폐장 시간:', event.closingHours);
        console.log('이벤트 타입:', event.eventType);
        console.log('태그:', event.tags);
        console.log('생성일:', event.creationDate);
        console.log('삭제 여부:', event.isDeleted);
        console.log('삭제일:', event.deletionDate);
        
        // API 요청을 통해 데이터를 서버에 전송
        try {
            const response = await axios.post(`/api/events/submit`, {
                eventNumber: event.eventNumber,
                id: event.id,
                name: event.name,
                title: event.title,
                businessName: event.businessName,
                content: event.content,
                startDate: event.startDate,
                endDate: event.endDate,
                openingHours: event.openingHours,
                closingHours: event.closingHours,
                eventType: event.eventType,
                tags: event.tags,
                creationDate: event.creationDate,
                isDeleted: event.isDeleted,
                deletionDate: event.deletionDate
            });
            
            console.log('Event created:', response.data);
            alert('행사가 등록되었습니다!');
            
            // 양식 초기화
            setEvent({
                eventNumber: '',
                id: '',
                name: '',
                title: '',
                businessName: '',
                content: '',
                startDate: '',
                endDate: '',
                openingHours: '',
                closingHours: '',
                eventType: '',
                tags: '',
                creationDate: '',
                isDeleted: false,
                deletionDate: ''
            });
         } catch (error) {
            console.error('There was an error creating the event!', error);
            alert('행사 등록 중 오류가 발생했습니다.');
        }
    };



    return (
        <div className="footer-container">
            <h1>행사 등록</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="eventNumber">행사 번호:</label>
                <input
                    type="text"
                    id="eventNumber"
                    name="eventNumber"
                    value={event.eventNumber}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="id">아이디:</label>
                <input
                    type="text"
                    id="id"
                    name="id"
                    value={event.id}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="name">이름:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={event.name}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="title">제목:</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={event.title}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="businessName">사업체명:</label>
                <input
                    type="text"
                    id="businessName"
                    name="businessName"
                    value={event.businessName}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="content">내용:</label>
                <textarea
                    id="content"
                    name="content"
                    value={event.content}
                    onChange={handleChange}
                    rows="5"
                    required
                ></textarea>

                <label htmlFor="startDate">시작일:</label>
                <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={event.startDate}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="endDate">종료일:</label>
                <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    value={event.endDate}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="openingHours">개장 시간:</label>
                <input
                    type="time"
                    id="openingHours"
                    name="openingHours"
                    value={event.openingHours}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="closingHours">폐장 시간:</label>
                <input
                    type="time"
                    id="closingHours"
                    name="closingHours"
                    value={event.closingHours}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="eventType">이벤트 타입:</label>
                <select
                    id="eventType"
                    name="eventType"
                    value={event.eventType}
                    onChange={handleChange}
                    required
                >
                    <option value="">선택하세요</option>
                    <option value="type1">타입 1</option>
                    <option value="type2">타입 2</option>
                    <option value="type3">타입 3</option>
                </select>

                <label htmlFor="tags">태그:</label>
                <input
                    type="text"
                    id="tags"
                    name="tags"
                    value={event.tags}
                    onChange={handleChange}
                />

                <label htmlFor="creationDate">생성일:</label>
                <input
                    type="date"
                    id="creationDate"
                    name="creationDate"
                    value={event.creationDate}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="isDeleted">삭제 여부:</label>
                <select
                    id="isDeleted"
                    name="isDeleted"
                    value={event.isDeleted}
                    onChange={(e) => handleChange({ target: { name: 'isDeleted', value: e.target.value === 'true' } })}
                    required
                >
                    <option value="false">아니오</option>
                    <option value="true">예</option>
                </select>

                <label htmlFor="deletionDate">삭제일:</label>
                <input
                    type="date"
                    id="deletionDate"
                    name="deletionDate"
                    value={event.deletionDate}
                    onChange={handleChange}
                />

                <button type="submit">등록</button>
            </form>
        </div>
    );
};

export default Submit;