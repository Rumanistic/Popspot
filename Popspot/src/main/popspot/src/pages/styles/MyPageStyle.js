import styled from 'styled-components';

export const MyPageContainer = styled.div`
  max-width: 500px;
  margin: 50px auto;
  padding: 40px;
  background-color: #FFFFFF; /* 주조색 */
  border: 1px solid #1F2933; /* 보조색 */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  font-family: 'Roboto', sans-serif;
  text-align: center;
`;

export const MyPageTitle = styled.h2`
  font-size: 1.8rem;
  color: #1F2933; /* 보조색 */
  margin-bottom: 20px;
  font-weight: bold;
  border-bottom: 2px solid #006EB9; /* 강조색 */
  padding-bottom: 10px;
`;

export const InputField = styled.input`
  width: 100%;
  padding: 15px;
  margin-bottom: 20px;
  border: 1px solid #1F2933; /* 보조색 */
  background-color: #FFFFFF; /* 주조색 */
  font-size: 1.1rem;
  color: #1F2933; /* 보조색 */
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #006EB9; /* 강조색 */
    box-shadow: 0 2px 8px rgba(0, 110, 185, 0.3);
  }
`;

export const MyPageButton = styled.button`
  width: 100%;
  padding: 15px;
  background-color: #006EB9; /* 강조색 */
  color: #FFFFFF; /* 주조색 */
  border: 1px solid #1F2933; /* 보조색 */
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #004A8F; /* 강조색 다크 */
    transform: translateY(-3px);
  }

  &:active {
    transform: scale(0.98);
    box-shadow: 0 2px 4px rgba(0, 110, 185, 0.3);
  }
`;

export const InfoContainer = styled.div`
  margin-top: 20px;
  padding: 20px;
  background-color: #F9F9F9; /* 약간의 배경색 변화 */
  border: 1px solid #1F2933; /* 보조색 */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

export const ErrorMessage = styled.p`
  color: #FF6347; /* 오류 메시지 색상 */
  font-size: 1rem;
  margin-bottom: 20px;
  font-weight: bold;
  background-color: #FFE6E6; /* 오류 배경 */
  padding: 10px;
  border: 1px solid #FF6347;
  text-align: center;
`;
