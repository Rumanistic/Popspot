import { styled } from 'styled-components';

export const ListContainer = styled.section`
  width: 100%;
  background-color: #FFFFFF;
  padding: 20px 30px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
`;

export const StarImg = styled.img`
  width: 15px;
`;

export const ListHeaderContainer = styled.div`
  display: flex;
  align-items: center; /* 수직 정렬 */
  justify-content: space-between; /* 양 끝 정렬 */
  position: relative; /* 제목을 플렉스 중앙에 배치 */
  width: 100%;
  margin-bottom: 30px;
`;

export const ListHeaderContainerHead1 = styled.h1`
  font-size: 2.8rem;
  color: #1F2933;
  font-weight: 700;
  text-align: center;
  margin: 0 auto; /* 플렉스 컨테이너에서 중앙 정렬 */
  font-family: 'Jeju Gothic', sans-serif;
  flex-grow: 1; /* 제목이 중앙을 유지하도록 공간을 채움 */
`;

export const EventCardSpan = styled.span`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2vw;
  background-color: rgba(0, 110, 185, 0.1);
  margin-top: 2vh; 
  padding: 2vw;
  border: 0.1vw solid #E5E7EB; 
`;



export const Col4 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
  background-color: #1F2933;
  color: #FFFFFF;
  padding: 15px;
  border: 1px solid #E5E7EB;

  &:hover {
    background-color: #006EB9;
    color: #FFFFFF;
  }
`;

export const EventCardSpanImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  margin-bottom: 12px;
  border: 1px solid #E5E7EB;
`;

export const ListContentContainer = styled.section`
  display: inline-flex;
  margin-top: 30px;
  padding: 15px;
  background-color: #FFFFFF;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  border: 1px solid #E5E7EB;
  gap: 40px;
`;

export const ListContentTagsContainer = styled.aside`
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  min-width: 15vw; /* 최소 너비를 15%로 설정 */
  max-width: 15vw; /* 최대 너비를 15%로 설정 */
  padding: 15px;
  justify-content: flex-start;
  border: 1px solid #E5E7EB;
`;


export const ListContentTag = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 12px;
  border: ${({ value }) => (value ? 'solid 1px #006EB9' : 'solid 1px #E5E7EB')};
  background-color: ${({ value }) => (value ? '#006EB9' : '#FFFFFF')};
  color: ${({ value }) => (value ? '#FFFFFF' : '#1F2933')};
  font-size: 0.9rem;
  margin: 5px;
  cursor: pointer;
  text-transform: capitalize;

  &:hover {
    background-color: ${({ value }) => (value ? '#005BB5' : '#F4F4F9')};
  }
`;

export const StyledButton = styled.button`
  padding: 10px 20px;
  margin: 20px auto;
  display: block;
  border: 2px solid #006EB9;
  background-color: #FFFFFF;
  color: #006EB9;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;

  &:hover {
    background-color: #006EB9;
    color: #FFFFFF;
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const StyledMessage = styled.div`
  color: #1F2933;
  font-size: 0.9rem;
  font-weight: bold;
  margin-top: 10px;
  text-align: center;
  text-transform: uppercase;
`;

export const StyledRegisterButton = styled.button`
  padding: 10px 20px;
  background-color: #006EB9; /* 버튼 배경색 */
  color: #FFFFFF; /* 버튼 텍스트 색상 */
  font-size: 1rem;
  font-weight: bold;
  border: 2px solid #005BB5; /* 테두리 */
  border-radius: 0; /* 둥근 테두리 제거 */
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s ease, transform 0.3s ease;
  text-align: center;
  white-space: nowrap;
  position: absolute; /* 버튼을 오른쪽 끝에 고정 */
  right: 0; /* 부모 컨테이너의 오른쪽 끝 */
`;
