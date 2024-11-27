import styled from 'styled-components';

export const WithdrawContainer = styled.div`
  max-width: 500px;
  margin: 100px auto;
  padding: 40px;
  background-color: #fffaf0;
  border-radius: 20px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  font-family: 'Pretendard-Regular', sans-serif;
  text-align: center;
  box-sizing: border-box; /* box-sizing 설정 */
`;

export const Title = styled.h2`
  text-align: center;
  margin-bottom: 40px;
  font-size: 2.4rem;
  color: #4a4a4a;
  font-family: 'Pretendard-Regular', sans-serif;
  font-weight: 700;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  font-family: 'Pretendard-Regular', sans-serif;
  width: 100%; /* Form이 전체 너비를 차지하도록 설정 */
`;

export const Label = styled.label`
  text-align: left;
  margin-bottom: 8px;
  color: #555;
  font-weight: 500;
  font-size: 1.2rem;
  font-family: 'Pretendard-Regular', sans-serif;
`;

export const Input = styled.input`
  padding: 14px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #f9f9f9;
  color: #333;
  font-size: 1.1rem;
  width: 100%; /* Input의 너비를 100%로 설정 */
  box-sizing: border-box; /* box-sizing 설정 */
  box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.1);
  font-family: 'Pretendard-Regular', sans-serif;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &:focus {
    outline: none;
    border-color: #a3a3a3;
    box-shadow: 0 0 10px rgba(163, 163, 163, 0.5);
  }
`;

export const Button = styled.button`
  padding: 15px;
  background: linear-gradient(45deg, #f4b5b5, #f6d3d3);
  color: #fff;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-size: 1.2rem;
  width: 100%; /* 버튼도 전체 너비를 차지하도록 설정 */
  font-family: 'Pretendard-Regular', sans-serif;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(45deg, #e89b9b, #f0b6b6);
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  }

  &:active {
    background: linear-gradient(45deg, #d87e7e, #e5a2a2);
    transform: scale(0.98);
  }
`;

export const ErrorMessage = styled.div`
  color: #c87070;
  margin-bottom: 25px;
  text-align: center;
  font-weight: bold;
  animation: shake 0.3s ease-in-out;
  font-family: 'Pretendard-Regular', sans-serif;

  @keyframes shake {
    0% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    50% { transform: translateX(5px); }
    75% { transform: translateX(-5px); }
    100% { transform: translateX(0); }
  }
`;
