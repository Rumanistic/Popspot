import { styled } from 'styled-components';

export const ListContainer = styled.section`
  width: 100%;
  background-color: #FFFFFF;
  padding: 20px 30px; /* 양쪽 패딩을 추가로 늘림 */
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
`;


export const StarImg = styled.img`
  width: 15px;
`;

export const ListHeaderContainer = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 30px;
`;

export const ListHeaderContainerHead1 = styled.h1`
  font-size: 2.8rem;
  color: #1F2933; 
  font-weight: 700;
  text-align: center;
  margin: 0;
  width: 100%;
  font-family: 'Jeju Gothic', sans-serif;
`;

export const EventCardSpan = styled.span`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 25px;
  background-color: rgba(0, 110, 185, 0.1);
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #E5E7EB;
  max-height: 600px; /* 최대 높이 고정 */
  overflow-y: hidden; /* 초과된 내용은 숨김 */
  transition: max-height 0.3s ease; /* 높이 변화에 애니메이션 추가 */
`;


export const Col4 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
  background-color: #1F2933; /* 어두운 배경 */
  color: #FFFFFF; /* 텍스트 색상 */
  padding: 15px; /* 내부 여백을 조금 늘림 */
  border: 1px solid #E5E7EB; /* 테두리 추가 */

  &:hover {
    transform: scale(1.05);
    background-color: #006EB9;
    color: #FFFFFF;
  }
`;

export const EventCardSpanImage = styled.img`
  width: 100%;
  height: 150px; /* 이미지 높이를 고정 */
  object-fit: cover; /* 이미지 크기에 따라 자르기 */
  margin-bottom: 12px; /* 이미지와 텍스트 간격 약간 늘림 */
  border: 1px solid #E5E7EB; /* 테두리 */
`;

export const ListContentContainer = styled.section`
  display: inline-flex;
  margin-top: 30px; /* 태그 컨테이너와 카드 리스트 컨테이너 간격을 늘림 */
  padding: 15px; /* 내부 여백을 조금 늘림 */
  background-color: #FFFFFF;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  border: 1px solid #E5E7EB; /* 테두리 추가 */
  gap: 40px; /* 태그와 카드 리스트 간의 간격 추가 */
  max-height: 800px; /* 최대 높이 고정 */
  overflow-y: auto; /* 높이를 초과하는 경우 스크롤 표시 */
`;



export const ListContentTagsContainer = styled.aside`
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  min-width: 300px; /* 컨테이너 최소 크기 증가 */
  padding: 15px; /* 내부 여백을 늘림 */
  max-width: 300px; /* 최대 크기도 증가 */
  justify-content: flex-start; /* 왼쪽 정렬 */
  border: 1px solid #E5E7EB; /* 테두리 추가 */
`;

export const ListContentTag = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 12px; /* 태그 크기를 조금 줄임 */
  border: ${({ value }) => (value ? 'solid 1px #006EB9' : 'solid 1px #E5E7EB')};
  background-color: ${({ value }) => (value ? '#006EB9' : '#FFFFFF')};
  color: ${({ value }) => (value ? '#FFFFFF' : '#1F2933')};
  font-size: 0.9rem; /* 글씨 크기 조정 */
  margin: 5px;
  cursor: pointer;
  text-transform: capitalize; /* 텍스트 첫 글자 대문자 */

  &:hover {
    background-color: ${({ value }) => (value ? '#005BB5' : '#F4F4F9')};
  }
`;

export const StyledButton = styled.button`
  padding: 10px 20px;
  margin: 0 auto;
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
  color: #1F2933; /* 보조색 */
  font-size: 0.9rem; /* 글씨 크기 조정 */
  font-weight: bold;
  margin-top: 10px;
  text-align: center;
  text-transform: uppercase;
`;

