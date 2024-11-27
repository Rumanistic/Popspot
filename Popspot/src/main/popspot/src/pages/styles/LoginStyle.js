import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #fdfdfd;
  font-family: 'Jeju Gothic', sans-serif; /* Jeju Gothic 글씨체 */
`;

export const LoginContainer = styled.div`
  width: 400px;
  padding: 40px;
  background-color: #fffaf0;
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-align: center;
  font-family: 'Jeju Gothic', sans-serif; /* Jeju Gothic 글씨체 */

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2);
  }
`;

export const Title = styled.h2`
  font-size: 2.4rem;
  color: #333;
  margin-bottom: 25px;
  font-weight: 700;
  font-family: 'Jeju Gothic', sans-serif; /* Jeju Gothic 글씨체 */
`;

export const Input = styled.input`
  display: block;
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
  font-size: 1.2rem;
  font-family: 'Jeju Gothic', sans-serif; /* Jeju Gothic 글씨체 */
`;

export const ErrorMessage = styled.p`
  color: red;
  font-size: 1rem;
  margin-bottom: 10px;
  font-family: 'Jeju Gothic', sans-serif; /* Jeju Gothic 글씨체 */
`;

export const Button = styled.button`
  padding: 0;
  margin-top: 15px; /* 간격 조정 */
  background-color: #e67e22;
  color: white;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  font-weight: bold;
  transition: background-color 0.3s ease, transform 0.3s ease;
  font-family: 'Jeju Gothic', sans-serif; /* Jeju Gothic 글씨체 */

  &:hover {
    background-color: #d35400;
  }

  &:active {
    background-color: #c0392b;
  }
`;

export const SignupButton = styled(Button)`
  background-color: #e67e22;

  &:hover {
    background-color: #d35400;
  }
`;

export const FindButton = styled(Button)`
  background-color: #f5b041; /* 더 밝은 살구색 */
  &:hover {
    background-color: #e59866; /* 호버 시 약간 어두운 살구색 */
  }

  &:active {
    background-color: #d98840; /* 클릭 시 더 어두운 오렌지 */
  }
`;
