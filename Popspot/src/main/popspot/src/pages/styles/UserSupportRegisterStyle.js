import { styled } from 'styled-components';

export const ContentContainer = styled.div`
  width: 100%; 
  max-width: 1200px; /* 추가: 한 화면에 맞게 최대 너비 설정 */
  height: 90%;
  font-size: 20px;
  font-family: 'Pretendard-Regular', sans-serif;
  justify-content: center; 
  align-items: center; 
  display: flex;
  flex-direction: column;
  margin: 0 auto; /* 추가: 중앙 정렬 */
`;

export const ContentHorizontalBar = styled.span`
  display: flex;
  margin: 10px auto;
  width: 95%; 
  height: 2px;
  background-color: #006EB9; 
`;

export const ContentHorizontalSpan = styled.span`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 15px;
  width: 100%; /* 수정: 가로 너비를 최대화 */
  padding: 4px;
  cursor: ${({ redirect }) => (redirect === 'y' ? 'pointer' : 'default')};
  font-family: 'Pretendard-Regular', sans-serif;

  label {
    white-space: nowrap; /* 추가: 텍스트가 한 줄로 유지되도록 설정 */
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
  justify-content: center;
  text-align: left;
  margin-left: 200px;
  margin-bottom: 20px;
  font-family: 'Pretendard-Regular', sans-serif;
`;

export const Label = styled.label`
  font-size: 18px;
  width: 20%; 
  text-align: left;
  margin-left: 130px;
  height: 20px;
  justify-content: center;
  align-items: center;
  font-family: 'Pretendard-Regular', sans-serif;
`;

export const TitleInput = styled.input`
  font-size: 16px;
  width: 50%; 
  height: 30px; 
  margin-top: 15px;
  font-family: 'Pretendard-Regular', sans-serif;
`;

export const SelectType = styled.select`
  font-size: 16px;
  width: 10%; /* 수정: 선택 칸 크기 조정 */
  height: 30px; /* 수정: 선택 칸 높이 증가 */
  margin-top: 10px;
  margin-bottom: 7px;
  font-family: 'Pretendard-Regular', sans-serif;
`;

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

  &:hover {
    background-color: #ffcccc;
    transform: scale(1.05);
  }

  &:active {
    background-color: #ffb3b3;
  }
`;

export const Textarea = styled.textarea`
  width: 650px; /* 수정: 문의 내용 칸의 가로 크기 조정 */
  height: 100px; /* 수정: 문의 내용 칸의 세로 크기 조정 */
  padding: 10px;
  font-size: 16px;
  font-family: 'Pretendard-Regular', sans-serif;
  resize: none;  
  margin-right: -550px;
  margin-left: 50px;
`;

export const CheckboxLabel = styled.label`
  font-size: 15px;
  color: black;
  position: absolute;
  margin: 165px 0 0 450px;
  font-family: 'Pretendard-Regular', sans-serif;
  
`;

export const SecretCheckbox = styled.input`
  cursor: pointer;
  padding: 0;
  position: absolute;
  margin: 165px 0 0 530px;
`;

export const RightFloatSpan = styled.span`
  display: flex;
  align-items: center;
  justify-content: flex-end; 
  gap: 8px;
  position: absolute;
  bottom: 10px; /* 수정: Textarea 내부 하단과 간격 조정 */
  right: 10px; /* 수정: Textarea 내부 우측과 간격 조정 */
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
