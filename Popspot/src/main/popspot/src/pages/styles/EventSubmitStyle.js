import styled from 'styled-components';

export const EventContainer = styled.div`
  max-width: 800px;
  margin: 50px auto;
  padding: 40px;
  background-color: #FFFFFF; /* 주조색 */
  border: 1px solid #1F2933; /* 보조색 */
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

`;

export const TitleInput = styled.input`
  width: 100%;
  font-size: 1.5rem;
  padding: 10px;
  border: 1px solid #1F2933;
  margin-bottom: 20px;
  box-sizing: border-box;
`;

export const DetailItem = styled.div`
  padding: 10px 0;
  border-bottom: 2px dashed #006EB9;

  &:last-child {
    border-bottom: none;
  }
`;

export const SubInput = styled.input`
  width: 100%;
  font-size: 1rem;
  padding: 10px;
  border: 1px solid #1F2933;
  margin-bottom: 10px;
  box-sizing: border-box;
`;

export const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  border: 2px dashed #006eb9;
  padding: 10px;
  margin-bottom: 10px;
`;

export const Tag = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 5px 10px;
  background-color: #006eb9;
  color: #ffffff;
  border-radius: 4px;
  font-size: 0.9rem;
`;

export const DeleteButton = styled.button`
  background: none;
  border: none;
  color: white;
  margin-left: 5px;
  cursor: pointer;
  font-size: 0.9rem;

  &:hover {
    color: #ff4d4d;
  }
`;

export const TagInput = styled.input`
  flex: 1;
  border: 2px solid #006eb9;
  padding: 10px;
  font-size: 1rem;
  outline: none;
  width : 40%;
  &:focus {
    border-color: #005bb5;
  }
`;



export const SelectTime = styled.select`
  border: 1px solid #1F2933;
  background-color: #FFFFFF;
  padding: 5px 10px;
  margin-right: 10px;
  cursor: pointer;
`;

export const EditableParagraph = styled.p`
  min-height: 100px;
  background-color: #F8F9FA;
  padding: 10px;
  border: 1px solid #1F2933;
  font-size: 1rem;
  margin-bottom: 10px;
  overflow: auto;
`;

export const AddressInput = styled.input`
  width: calc(70% - 10px);
  padding: 10px;
  margin-right: 10px;
  font-size: 14px;
  border: 1px solid #1F2933;
  box-sizing: border-box;
`;

export const AddressButton = styled.button`
  padding: 10px 20px;
  background-color: #006EB9;
  color: #FFFFFF;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #005BB5;
  }
`;

export const MapContainer = styled.div`
  width: 100%;
  height: 350px;
  margin-top: 10px;
  display: none;
  border: 1px solid #1F2933;
`;

export const SubmitButton = styled.button`
  width: 40%;
  padding: 10px;
  background-color: #006EB9;
  color: #FFFFFF;
  font-size: 1rem;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #005BB5;
  }
`;

export const DateContainer = styled.div`
  display: flex; /* Flexbox로 수평 정렬 */
  justify-content: center; /* 가로 가운데 정렬 */
  align-items: center; /* 세로 가운데 정렬 */
  gap: 10px; /* 각 달력 입력 사이 간격 */
  margin-top: 10px; /* 위아래 여백 */
`;

export const TitleContainer = styled.div`
  display: flex; /* 제목과 이미지를 나란히 배치 */
  align-items: center; /* 수직 정렬 */
  justify-content: center; /* 가로 정렬 */
  margin-bottom: 20px;
`;

export const TitleImage = styled.img`
  width: 50px; /* 이미지 크기 */
  height: 50px; /* 이미지 크기 */
  margin-left: 10px; /* 제목과 이미지 사이 간격 */
`;
