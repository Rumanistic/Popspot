import styled from 'styled-components';

// 컨테이너
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f4f4f4;
  font-family: 'Jeju Gothic', sans-serif;
  padding: 20px;
`;

// 인풋 스타일
export const Input = styled.input`
  width: 100%;
  max-width: 400px;
  padding: 12px;
  margin-bottom: 20px;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 1.2rem;
  font-family: 'Jeju Gothic', sans-serif;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;

  &:focus {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    border-color: #f08a5d;
    outline: none;
  }
`;

// 버튼 스타일
export const Button = styled.button`
  width: 100%;
  max-width: 400px;
  padding: 12px;
  background-color: #f08a5d;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 1.2rem;
  font-family: 'Jeju Gothic', sans-serif;
  transition: background-color 0.3s ease, transform 0.2s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;

  &:hover {
    background-color: #e76f51;
    transform: translateY(-2px);
  }

  &:active {
    background-color: #d1603d;
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

// 에러 메시지 스타일
export const ErrorMessage = styled.p`
  color: #d9534f;
  font-size: 1rem;
  margin-bottom: 15px;
  font-family: 'Jeju Gothic', sans-serif;
  text-align: center;
  background-color: #f8d7da;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #f5c6cb;
`;

// FindButton은 기존 Button 스타일을 상속하여 사용
export const FindButton = styled(Button)`
  background-color: #f08a5d;

  &:hover {
    background-color: #e76f51;
  }

  &:active {
    background-color: #d1603d;
  }
`;
