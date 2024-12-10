import styled from 'styled-components';

export const WithdrawContainer = styled.div`
  max-width: 500px;
  margin: 100px auto;
  padding: 40px;
  background-color: #f4f4f4;
  border: 1px solid #d3d3d3;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  font-family: 'Pretendard-Regular', sans-serif;
  text-align: center;
  box-sizing: border-box;
`;

export const Title = styled.h2`
  text-align: center;
  margin-bottom: 40px;
  font-size: 2.4rem;
  color: #333;
  font-family: 'Pretendard-Regular', sans-serif;
  font-weight: 700;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  font-family: 'Pretendard-Regular', sans-serif;
  width: 100%;
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
  border: 1px solid #bbb;
  background-color: #ffffff;
  color: #333;
  font-size: 1.1rem;
  width: 100%;
  box-sizing: border-box;
  font-family: 'Pretendard-Regular', sans-serif;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &:focus {
    outline: none;
    border-color: #888;
    box-shadow: 0 0 5px rgba(136, 136, 136, 0.5);
  }
`;

export const Button = styled.button`
  padding: 15px;
  background-color: #888;
  color: #fff;
  border: 1px solid #555;
  cursor: pointer;
  font-size: 1.2rem;
  width: 100%;
  font-family: 'Pretendard-Regular', sans-serif;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #666;
    transform: translateY(-3px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  &:active {
    background-color: #444;
    transform: scale(0.98);
  }
`;

export const ErrorMessage = styled.div`
  color: #a33;
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
