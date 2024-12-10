import styled from 'styled-components';

// 기본 스타일 컨테이너
export const RightFloatSpan = styled.span`
  width: 90vh;
  justify-content: flex-end;
  margin-bottom: 10px;
  margin-right: 70px;
  background-color: #ffffff;
  color: white;
  margin-left: auto;
`;


export const FaqDetails = styled.details`
   width: 80vw; /* 너비를 화면 전체로 고정 */
   text-align: start;
   margin-top: -20px;
   margin-bottom: 40px;
   font-size: 18px;
`;

export const FaqBox = styled.div`
  padding: 10px;
  margin: 20px 0;
  background-color: white;
  
`;

/* 모달 배경 */
export const ModalBackgroundArea = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1001; /* header보다 위에 있어야됨 */
`;

/* 모달 컨텐츠 박스 */
export const ModalContentArea = styled.div`
  background-color: #ffffff;
  padding: 20px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  width: 500px;
  max-width: 80%;
`;

/* 모달 컨텐츠 부분 */
export const ModalFormContentArea = styled.article`
   width: 95%;
   text-align: center;
   
`;


/* 모달 헤드 */
export const ModalHeadArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2.5px solid #006EB9;
  padding-bottom: 10px;
  margin-bottom: 20px;
`;

/* 모달 제목 부분 */
export const ModalHeadH2 = styled.h2`
  font-size: 24px;
  margin-left: 10px;
  margin-bottom: 20px;
  color: #006EB9;
`;

/* 모달 닫기 버튼*/
export const ModalCloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
`;

/* 폼 내부 label */
export const FormLabel = styled.label`
  font-size: 16px;
  display: block;
`;

/* 폼 내부 input */
export const FormInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

/* 폼 내부 textarea */
export const FormTextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  resize: vertical;
`;

/* 폼 내부 버튼 영역 */
export const FormButtonArea = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

/* 폼 submit 버튼 */
export const FormSubmitButton = styled.button`
  background-color: #006EB9;
  color: white;
  border-radius: 0px;
  padding: 7px 12px;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: #0078b9;
  }
`;

/* 폼 reset 버튼 */
export const FormResetButton = styled.button`
  background-color: #ddd;
  color: #333;
  border: none;
  padding: 7px 12px;
  font-size: 16px;
  border-radius: 0px;
  cursor: pointer;
  &:hover {
    background-color: #bbb;
  }
`;

/* 고객지원 이동 헤더 = 찾으시는 내용이 없나요?*/
export const FaqH3 = styled.h3`
   width: 40%;
   display: inline-flex;
   align-items: center;
   justify-content: space-evenly;
`;
