import styled from 'styled-components';

// 전체 배경
export const EventContainer = styled.div`
  max-width: 800px;
  margin: 50px auto;
  padding: 40px;
  background-color: #fff8e7; /* 밝고 화사한 아이보리 톤 */
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
  }
`;

// 이벤트 제목
export const EventTitle = styled.h1`
  font-size: 2.4rem;
  color: #e74c3c;
  text-align: center;
  margin-bottom: 25px;
  font-weight: 700;
`;

// 이미지 컨테이너
export const EventImages = styled.img`
	margin: 2px 0;
	max-width: 100%;
`;

// 이벤트 상세 정보 아이템
export const EventDetailItem = styled.div`
  padding: 10px 0;
  border-bottom: 2px dashed #ffa726; /* 따뜻한 오렌지 컬러 */
  font-family: 'Pretendard-Regular', sans-serif;
  color: #333; /* 검정색 */

  &:last-child {
    border-bottom: none;
  }
`;

// 이벤트 섹션 제목
export const EventHeading = styled.h3`
  color: #6d4c41; /* 따뜻한 브라운 */
  font-size: 1.5rem;
  margin-top: 20px;
  margin-bottom: 10px;
`;


// 이벤트 본문
export const EventParagraph = styled.p`
  font-size: 1.2rem;
  margin-bottom: 1.2rem;
  color: #333; /* 검정색 */
  line-height: 1.8;

  span {
    font-weight: 500;
    color: #42a5f5; /* 밝은 블루로 강조 */
  }
`;

// 이벤트 위치
export const EventLocation = styled.p`
  font-size: 1.3rem;
  color: #333; /* 검정색 */
  font-weight: bold;
`;

// 버튼 스타일
export const Button = styled.button`
  display: inline-block;
  background-color: #f08a5d; /* 밝은 블루 */
  color: white;
  width: 200px;
  height: 50px;
  font-size: 1.1rem;
  border-radius: 50px;
  margin-top: 20px;
  text-align: center;
  line-height: 50px;
  transition: background-color 0.3s ease, transform 0.3s ease;
  text-decoration: none;
  border: none;
  outline: none;
  cursor: pointer;

  &:hover {
    background-color: #e76f51;
    transform: scale(1.05);
  }

  &:active {
    background-color: #e76f51;
    transform: scale(0.98);
  }
`;



// 반응형 스타일
export const ResponsiveContainer = styled.div`
  @media (max-width: 768px) {
    ${EventContainer} {
      padding: 20px;
    }

    ${EventTitle} {
      font-size: 2rem;
    }

    ${EventParagraph} {
      font-size: 1rem;
    }
  }
`;