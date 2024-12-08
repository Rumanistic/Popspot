import styled from 'styled-components';

export const ContentContainer = styled.div`
  width: ${({ width }) => (width ? `${width}px` : '90%')};
  background-color: #fffcf7;
  padding: 20px;
  margin: 20px auto;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 25px 0;
  font-family: 'Pretendard-Regular', sans-serif;
`;

export const ContentHorizontalBar = styled.div`
  width: ${({ width }) => (width ? width : '85%')};
  height: ${({ borderpixel }) => (borderpixel ? `${borderpixel}px` : '1px')};
  background-color: #FFA2A2;
  margin: 10px 0;
`;

export const ContentHorizontalSpan = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0;

  label {
    font-size: 16px;
    font-family: 'Pretendard-Regular', sans-serif;
  }

  input, select {
    font-size: 16px;
    font-family: 'Pretendard-Regular', sans-serif;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  input[type="submit"], input[type="reset"] {
    background-color: #FFA2A2;
    border: none;
    padding: 10px 20px;
    color: #fff;
    font-weight: bold;
    cursor: pointer;
    border-radius: 5px;
    margin-left: 10px;
  }

  input[type="submit"]:hover, input[type="reset"]:hover {
    background-color: #ff8a8a;
  }

  input[type="checkbox"] {
    width: 20px;
    height: 20px;
 
`;

export const ContentVerticalSpan = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const RightFloatSpan = styled.span`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;

  label {
    font-size: 16px;
    font-family: 'Pretendard-Regular', sans-serif;
    margin-right: 10px;
  }

  input[type="checkbox"] {
    width: 20px;
    height: 20px;
  }
`;


export const TitleInput = styled.input`
  font-size: 16px;
  width: 60%;
  height: 28px;
  margin-top: 5px;
  padding: 8px;
  font-family: 'Pretendard-Regular', sans-serif;
`;

export const SelectType = styled.select`
  font-size: 16px;
  width: 10%;
  height: 28px;
  margin-top: 10px;
  font-family: 'Pretendard-Regular', sans-serif;
`;

export const Label = styled.label`
  font-size: 20px;
  width: ${({ width }) => width || '30%'};
  justify-content: center;
  align-items: center;
  font-family: 'Pretendard-Regular', sans-serif;
`;

export const CheckboxLabel = styled.label`
  font-size: 19px;
  width: 100%;
  align-content: right;
  margin-right: 5px; 
  font-family: 'Pretendard-Regular', sans-serif;
`;

export const SecretCheckbox = styled.input`
  align-content: right;
  margin-top: 10px;
  cursor: pointer;
`;

export const SubmitResetButtons = styled.div`
  display: flex;
  justify-content: flext-start;
  width: auto;
  align-items: center;
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 20%;

  input[type='reset'] {
   background-color: lightpink;
   font-size: 13px;
   border-color: transparent;
   border-radius: 10px;
   cursor: pointer;
   padding: 10px 10px;
   margin-left: 10px;
   margin-right: 180px;
   width: auto;
  }
  input[type='submit'] {
   background-color: lightpink;
   font-size: 13px;
   border-color: transparent;
   border-radius: 10px;
   cursor: pointer;
   padding: 10px 10px;
   margin-right: 150px;
   width: auto;
  }
`;
