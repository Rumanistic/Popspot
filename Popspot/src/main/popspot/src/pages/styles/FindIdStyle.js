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
  padding-top: 60px; /* 위쪽 여백 추가 */
`;


export const TabText = styled.span`
  font-size: 1.2rem;
  font-family: 'Jeju Gothic', sans-serif;
  font-weight: ${(props) => (props.active ? 'bold' : 'normal')};
  color: ${(props) => (props.active ? '#006EB9' : '#888')};
  cursor: pointer;
  margin: 0 10px;

  &:hover {
    color: #005bb5;
  }
`;

export const Content = styled.div`
  width: 100%;
  max-width: 400px;
  min-height: 400px;
  text-align: center;
  padding: 20px;
  background-color: #F4F4F9;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;


export const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 10px;
  font-size: 1.1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-family: 'Jeju Gothic', sans-serif;

  &:focus {
    border-color: #006EB9;
    outline: none;
    box-shadow: 0 0 5px rgba(0, 110, 185, 0.3);
  }
`;

export const Button = styled.button`
  width: 100%;
  max-width: 300px;
  padding: 12px;
  margin-top: 10px;
  font-size: 1.2rem;
  font-family: 'Jeju Gothic', sans-serif;
  font-weight: bold;
  color: #fff;
  background-color: #006EB9;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  border-radius: 0;

  &:hover {
    background-color: #005bb5;
    transform: translateY(-2px);
  }

  &:active {
    background-color: #004a9f;
    transform: translateY(0);
  }
`;

export const ErrorMessage = styled.p`
  margin-top: 10px;
  color: red;
  font-size: 0.9rem;
  font-family: 'Jeju Gothic', sans-serif;
`;

export const BackText = styled.span`
  color: #006EB9;
  cursor: pointer;
  font-size: 1.0rem;

  &:hover {
    color: #338FD6;
  }
`;
export const StyledFindImg = styled.img`
  width: 100px; 
  height: 100px; 
`;
