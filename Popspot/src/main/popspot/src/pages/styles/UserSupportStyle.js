import { styled } from 'styled-components';

export const ContentContainer = styled.div`
  width: 100%; 
  font-size: 24px;
  font-family: 'Pretendard-Regular', sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 25px 0;
`;

export const ContentHorizontalBar = styled.span`
  
  display: flex;
  margin: 0 auto;
  width: ${({ width }) => width || '93%'};
  
  background-color: #ff8f8f;
  border: solid ${({ borderpixel }) => borderpixel || 1}px #ff8f8f;
`;

export const ContentHorizontalSpan = styled.span`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 90%;
  padding: 4px;
  align-items: center;
  cursor: ${({ redirect }) => (redirect === 'y' ? 'pointer' : 'default')};
  font-family: 'Pretendard-Regular', sans-serif;

  .no, .type, .secret, .userId, .title {
    min-height: 35px;
    display: flex;
    align-items: center;
  }

  .no {
    width: 3%;
  }

  .type {
    width: 11%;
    text-align: left;
    padding-left: 20px;
  }

  .secret {
    width: 3%;
  }

  .userId {
    width: 12%;
  }

  .title {
    flex-grow: 1;
  }
`;

export const ContentVerticalSpan = styled.span`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 25px 0 25px 80px;
  width: 90%;
  height: 100%;
  margin-bottom: 10px;
  font-family: 'Pretendard-Regular', sans-serif;
`;

export const ContentDetailBody = styled.section`
  min-width: 90%;
  text-align: center;
  font-family: 'Pretendard-Regular', sans-serif;
  margin-bottom: 10px;
`;

export const label = styled.span`
  margin-left: 100px;
`

export const StyledButton = styled.button`
  font-size: 16px;
  padding: 10px 20px;
  margin: 0 10px;  
  background-color: #4CAF50;  
  border: none;
  color: white;
  cursor: pointer;
  border-radius: 4px;
  transition: transform 0.2s ease, background-color 0.2s ease;
  
  /* Hover 상태일 때 */
  &:hover {
    background-color: #ffcccc;
    transform: scale(1.05);  /* 크기 확대 */
  }

  /* Active 상태일 때 */
  &:active {
    background-color: #ffb3b3;
  }
`;

export const TitleInput = styled.input`
  font-size: 16px;
  width: 58%;
  height: 25px;
  margin-top: 15px;
  font-family: 'Pretendard-Regular', sans-serif;
`;

export const SelectType = styled.select`
  font-size: 16px;
  width: 10%;
  height: 28px;
  margin-top: 10px;
  margin-bottom: 7px;
  font-family: 'Pretendard-Regular', sans-serif;
`;

export const Label = styled.label`
  font-size: 20px;
  width: ${({ width }) => width || '30%'};
  height: 20px;
  justify-content: center;
  align-items: center;
  font-family: 'Pretendard-Regular', sans-serif;
`;

export const RightFloatSpan = styled.span`
  display: flex;
  gap: 8px; 
  background-color: #ff8f8f;
`;

export const CheckboxLabel = styled.label`
  font-size: 19px;
  color: black;
  font-family: 'Pretendard-Regular', sans-serif;
`;

export const SecretCheckbox = styled.input`
  cursor: pointer;
  margin: 0;
  padding: 0;
`;

export const SubmitResetButtons = styled.div`
  display: flex;
  width: auto;
  justify-content: flex-end;
  align-items: center;
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 9%;

  input[type='reset'] {
   background-color: #ff8f8f;
   color: white;
   font-size: 15px;
   border-color: transparent;
   border-radius: 10px;
   cursor: pointer;
   padding: 8px 10px;
   margin-left: 10px;
   margin-right: 20px;
   width: auto;
  }
  input[type='submit'] {
   background-color: #ff8f8f;
   color: white;
   font-size: 15px;
   border-color: transparent;
   border-radius: 10px;
   cursor: pointer;
   padding: 8px 10px;
   margin-right: 0px;
   width: auto;
  }
`;