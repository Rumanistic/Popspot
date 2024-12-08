import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start; /* 콘텐츠를 위쪽으로 정렬 */
  align-items: center;
  height: 100vh;
  background-color: #FFFFFF;
  font-family: 'Jeju Gothic', sans-serif;
  padding: 20px;
  padding-top: 60px; 
`;

export const LoginContainer = styled.div`
  width: 400px;
  padding: 40px;
  background-color: #F4F4F9;
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-align: center;
  font-family: 'Jeju Gothic', sans-serif; /* Jeju Gothic 글씨체 */
`;

export const Title = styled.h2`
  font-size: 2.4rem;
  color: #1F2933;
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
  background-color: #006EB9;
  color: #FFFFFF;
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
    background-color: #338FD6;
  }

  &:active {
    background-color: #c0392b;
  }
`;

export const SignupButton = styled(Button)`
  background-color: #006EB9;

  &:hover {
    background-color: #338FD6;
  }
`;

export const FindText = styled.span`
  color: #006EB9;
;
  cursor: pointer;

  &:hover {
    color: #338FD6;
  }

  &:active {
    color: #d98840;
  }
`;


export const StyledLoginImg = styled.img`
  width: 50px; 
  height: 50px; 
`;
