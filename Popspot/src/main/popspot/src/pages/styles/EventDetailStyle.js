import styled from 'styled-components';

// 전체 배경
export const EventContainer = styled.div`
  max-width: 800px;
  margin: 50px auto;
  padding: 40px;
  background-color: #ffffff; /* 주조색 */
  border: 1px solid #1f2933; /* 보조색 */
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
`;

// 이벤트 제목
export const EventTitle = styled.h1`
  font-size: 2.4rem;
  color: #1f2933; /* 보조색 */
  text-align: center;
  margin-bottom: 25px;
  font-weight: bold;
  border-bottom: 2px solid #006eb9; /* 강조색 */
  padding-bottom: 10px;
`;

// 이미지 컨테이너
export const EventImages = styled.img`
  margin: 10px 0;
  max-width: 100%;
  border: 1px solid #1f2933; /* 보조색 */
  object-fit: cover;
`;

// 이벤트 상세 정보 아이템
export const EventDetailItem = styled.div`
  padding: 10px 0;
  border-bottom: 1px solid #1f2933; /* 보조색 */
  font-family: 'Roboto', sans-serif;
  color: #1f2933; /* 보조색 */
  font-size: 1rem;

  &:last-child {
    border-bottom: none;
  }
`;

// 이벤트 섹션 제목
export const EventHeading = styled.h3`
  color: #006eb9; /* 강조색 */
  font-size: 1.5rem;
  margin-top: 20px;
  margin-bottom: 10px;
  font-weight: bold;
`;

// 이벤트 본문
export const EventParagraph = styled.p`
  font-size: 1rem;
  margin-bottom: 1.2rem;
  color: #1f2933; /* 보조색 */
  line-height: 1.6;

  span {
    font-weight: bold;
    color: #006eb9; /* 강조색 */
  }
`;

// 이벤트 위치
export const EventLocation = styled.p`
  font-size: 1.2rem;
  color: #1f2933; /* 보조색 */
  font-weight: bold;
  border: 1px solid #006eb9; /* 강조색 */
  padding: 10px;
  margin-top: 20px;
`;

// 버튼 스타일
export const Button = styled.button`
  display: inline-block;
  background-color: #006eb9; /* 강조색 */
  color: #ffffff; /* 주조색 */
  width: 200px;
  height: 50px;
  font-size: 1.1rem;
  margin-top: 20px;
  text-align: center;
  border: 1px solid #1f2933; /* 보조색 */
  text-transform: uppercase;
  transition: background-color 0.3s ease, transform 0.3s ease;
  cursor: pointer;
  border-radius: 0; /* 테두리 둥근 효과 제거 */

  &:hover {
    background-color: #1f2933; /* 보조색 */
    color: #ffffff; /* 주조색 */
  }

  &:active {
    background-color: #004a8f; /* 강조색 다크 */
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
      font-size: 0.9rem;
    }
  }
`;

