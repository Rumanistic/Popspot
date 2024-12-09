import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f4f4f4; /* 부드러운 배경색 */
  font-family: 'Jeju Gothic', sans-serif; /* Jeju Gothic 글씨체 */
  padding: 20px; /* 화면 양옆에 여백 추가 */
`;

export const Input = styled.input`
  width: 100%;
  max-width: 400px;
  padding: 12px; /* 조금 더 여유 있는 패딩 */
  margin-bottom: 20px; /* 아래 간격을 더 크게 */
  border-radius: 8px; /* 더 부드러운 테두리 */
  border: 1px solid #ddd; /* 연한 테두리 */
  font-size: 1.2rem;
  font-family: 'Jeju Gothic', sans-serif; /* Jeju Gothic 글씨체 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 부드러운 그림자 */
  transition: box-shadow 0.3s ease;

  &:focus {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15); /* 포커스 시 그림자 확대 */
    border-color: #f08a5d; /* 포커스 시 테두리 색상 (코랄색) */
    outline: none; /* 기본 아웃라인 제거 */
  }
`;

export const Button = styled.button`
  width: 100%;
  max-width: 400px;
  padding: 12px; /* 조금 더 여유 있는 패딩 */
  background-color: #f08a5d; /* 코랄색 */
  color: white;
  border: none;
  border-radius: 20px; /* 더 둥글게 만들기 */
  cursor: pointer;
  font-size: 1.2rem;
  font-family: 'Jeju Gothic', sans-serif; /* Jeju Gothic 글씨체 */
  transition: background-color 0.3s ease, transform 0.2s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 약간의 그림자 */
  margin-bottom: 20px; /* 버튼 사이의 간격 조정 */
  border-radius: 0;

  &:hover {
    background-color: #e76f51; /* 호버 시 약간 어두운 코랄색 */
    transform: translateY(-2px); /* 약간 위로 올려 입체감 부여 */
  }

  &:active {
    background-color: #d1603d; /* 클릭 시 더 어두운 코랄색 */
    transform: translateY(0); /* 클릭 시 원래 위치로 돌아옴 */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 그림자 축소 */
  }
`;

export const ErrorMessage = styled.p`
  color: #d9534f; /* 붉은색을 더 부드럽게 */
  font-size: 1rem;
  margin-bottom: 15px;
  font-family: 'Jeju Gothic', sans-serif; /* Jeju Gothic 글씨체 */
  text-align: center; /* 중앙 정렬 */
  background-color: #f8d7da; /* 부드러운 배경색 */
  padding: 10px; /* 내부 여백 */
  border-radius: 8px; /* 둥근 모서리 */
  border: 1px solid #f5c6cb; /* 테두리 추가 */
`;
