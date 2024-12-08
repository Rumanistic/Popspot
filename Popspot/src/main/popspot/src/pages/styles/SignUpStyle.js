import styled from 'styled-components';

// 회원가입 전체 컨테이너
export const SignupContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 150vh;
  background-color: #FFFFFF;
  font-family: 'Jeju Gothic', sans-serif;
  padding: 20px;
  padding-top: 60px;
  max-width: 800px; /* 컨테이너 최대 넓이 */
  margin: 0 auto; /* 화면 중앙 정렬 */
`;

// 제목 스타일
export const Title = styled.h2`
  font-size: 2rem;
  font-family: 'Jeju Gothic', sans-serif;
  font-weight: bold;
  color: #1F2933;
  margin-bottom: 20px;
`;

// 폼 스타일
export const Form = styled.form`
  width: 100%;
  max-width: 600px; /* 폼의 최대 넓이 증가 */
  padding: 20px;
  background-color: #F4F4F9;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 15px; /* 입력 필드 간 간격 */
`;

// 라벨 스타일
export const Label = styled.label`
  font-size: 1rem;
  font-family: 'Jeju Gothic', sans-serif;
  font-weight: bold;
  color: #333;
  text-align: left;
  width: 80%; /* Input과 동일한 넓이 */
  margin: 0 auto 5px auto; /* Input 위에 오도록 아래 여백 추가 */
`;

// 입력 필드 스타일
export const Input = styled.input`
  width: 80%; /* 입력 필드 넓이를 줄임 */
  padding: 12px;
  font-size: 1.1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-family: 'Jeju Gothic', sans-serif;
  margin: 0 auto 15px auto; /* 수평 중앙 정렬 및 아래 여백 추가 */

  &:focus {
    border-color: #006EB9;
    outline: none;
    box-shadow: 0 0 5px rgba(0, 110, 185, 0.3);
  }
`;


// 드롭다운(Select) 스타일
export const Select = styled.select`
  width: 80%; /* 입력 필드와 동일한 넓이 */
  padding: 12px;
  font-size: 1.1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-family: 'Jeju Gothic', sans-serif;
  margin: 0 auto 10px auto; /* 수평 중앙 정렬 및 아래 여백 추가 */

  &:focus {
    border-color: #006EB9;
    outline: none;
    box-shadow: 0 0 5px rgba(0, 110, 185, 0.3);
  }
`;


// 버튼 스타일
export const Button = styled.button`
  width: 100%;
  max-width: 300px;
  padding: 12px;
  font-size: 1.2rem;
  font-family: 'Jeju Gothic', sans-serif;
  font-weight: bold;
  color: #fff;
  background-color: #006EB9;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  margin: 0 auto; 

  &:hover {
    background-color: #005bb5;
    transform: translateY(-2px);
  }

  &:active {
    background-color: #004a9f;
    transform: translateY(0);
  }
`;

// 에러 메시지 스타일
export const ErrorMessage = styled.p`
  margin-top: 5px;
  color: red;
  font-size: 0.9rem;
  font-family: 'Jeju Gothic', sans-serif;
  text-align: left;
  width: 100%;
`;

// 성공 메시지 스타일
export const SuccessMessage = styled.p`
  margin-top: 5px;
  color: green;
  font-size: 0.9rem;
  font-family: 'Jeju Gothic', sans-serif;
  text-align: left;
  width: 100%;
`;

// 뒤로 가기 텍스트 스타일
export const BackText = styled.span`
  color: #006EB9;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    color: #338FD6;
  }
`;

// 스타일 이미지
export const StyledSignupImg = styled.img`
  width: 100px; 
  height: 100px; 
  margin-bottom: 20px;
`;
