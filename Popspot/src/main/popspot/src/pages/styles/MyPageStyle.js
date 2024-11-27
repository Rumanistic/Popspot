import styled from 'styled-components';

export const MyPageContainer = styled.div`
  max-width: 500px; /* 크기를 조금 줄여서 맞춤 */
  margin: 50px auto;
  padding: 40px;
  background-color: #fffaf0; /* 부드러운 크림 색상 */
  border-radius: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  font-family: 'Pretendard-Regular', sans-serif;
  text-align: center;
`;

export const MyPageTitle = styled.h2`
  font-size: 1.8rem; /* 제목 크기 조정 */
  color: #f08a5d; /* 코랄 색상 */
  margin-bottom: 20px;
  font-family: 'Pretendard-Regular', sans-serif;
  font-weight: 700;
`;

export const InputField = styled.input`
  width: calc(100% - 40px); /* 필드 양옆에 여유 공간 확보 */
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 10px;
  border: 2px solid #f39c12; /* 따뜻한 오렌지 색상 */
  background-color: #fff;
  font-size: 1.1rem;
  color: #333;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.05);
  font-family: 'Pretendard-Regular', sans-serif;

  &:focus {
    outline: none;
    border-color: #f08a5d; /* 코랄 색상 */
    box-shadow: 0 2px 8px rgba(240, 138, 93, 0.3);
  }
`;

export const MyPageButton = styled.button`
  width: 100%; /* 버튼이 전체 너비에 맞도록 설정 */
  padding: 15px;
  background: linear-gradient(135deg, #f08a5d, #e76f51); /* 코랄 그라데이션 */
  color: white;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  font-size: 1.2rem;
  font-family: 'Pretendard-Regular', sans-serif;
  transition: background 0.3s ease, transform 0.2s ease;
  box-shadow: 0 4px 8px rgba(240, 138, 93, 0.2);
  
  &:hover {
    background: linear-gradient(135deg, #e76f51, #f08a5d); /* 반대로 그라데이션 */
    transform: translateY(-3px);
  }

  &:active {
    transform: scale(0.95);
    box-shadow: 0 2px 4px rgba(240, 138, 93, 0.3);
  }
`;

export const InfoContainer = styled.div`
  margin-top: 20px;
  padding: 20px;
  background-color: #fffcf7; /* 부드러운 배경 */
  border-radius: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

export const ErrorMessage = styled.p`
  color: #ff6347;
  font-size: 1rem;
  margin-bottom: 20px;
  font-weight: bold;
  background-color: #ffe6e6;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  text-align: center;
`;
