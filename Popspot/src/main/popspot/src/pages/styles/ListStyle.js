import { styled } from 'styled-components';

export const ListContainer = styled.section`
  width: 100%;
  background-color: #fffcf7; /* 부드러운 아이보리 배경 */
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

/*  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
  }*/
`;

export const StarImg = styled.img`
  width: 35px;
`;

export const ListHeaderContainer = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 30px;
`;

export const ListHeaderContainerHead1 = styled.h1`
  font-size: 2.8rem;
  color: #ff6b6b; /* 귀여운 느낌의 핑크톤 */
  font-weight: 700;
  text-align: center;
  margin: 0;
  width: 100%;
  font-family: 'Jeju Gothic', sans-serif;
`;

export const ViewChangeSpanContainer = styled.span`
  position: relative;
  float: right;
  display: inline-flex;
  background-color: rgba(255, 153, 102, 0.2); /* 부드러운 오렌지톤 */
  width: 90px;
  height: 40px;
  border-radius: 40px;
`;

export const ViewChangeSpanHamburger = styled.span`
  position: absolute;
  top: 8px;
  left: 8px;
  width: 25px;
  height: 25px;
  background-image: url('/img/hamburger.png');
  background-size: cover;
  background-position: center;
  opacity: ${({islistview}) => islistview === 'list' ? '1' : '0.4'};
  z-index: 1;
`;

export const ViewChangeSpanDot = styled.span`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 25px;
  height: 25px;
  background-image: url('/img/dot.png');
  background-size: cover;
  background-position: center;
  opacity: ${({islistview}) => islistview === 'list' ? '0.4' : '1'};
  z-index: 1;
`;

export const ViewChangeSpan = styled.span`
  position: absolute;
  display: inline-block;
  left: ${({islistview}) => islistview === 'list' ? '0px' : '40px'};
  transition: left 0.3s ease;
  width: 44px;
  height: 40px;
  background-color: rgba(255, 153, 102, 0.7);
  border-radius: 40px;
`;

export const EventListSpan = styled.span`
  display: inline-flex;
  flex-wrap: wrap;
  background-color: rgba(255, 228, 196, 0.4); /* 살구톤 */
  margin-top: 20px;
  border-radius: 15px;
  padding: 15px;
`;

export const Col12 = styled.div`
	padding: 5px;
  min-width: 100%;
  max-height: 400px;
  min-height: 400px;
  margin-bottom: 20px;
  border-radius: 15px;
  display: flex;
  justify-content: space-between;
`;

export const EventListSpanImage = styled.img`
	width: auto;
  height: auto;
  max-width: 400px;
  max-height: 400px;
  background-size: cover;
  background-position: center;
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

export const EventCardSpan = styled.span`
  display: inline-flex;
  flex-wrap: wrap;
  background-color: rgba(255, 228, 196, 0.4); /* 살구톤 */
  margin-top: 20px;
  border-radius: 15px;
  padding: 15px;
`;

export const Col4 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  max-width: 31.9%;
  margin: 10px;
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
  background-color: #fdf7d8; /* 부드러운 노란빛으로 배경색 설정 */

  &:hover {
    transform: scale(1.05);
    background-color: #ffe4e1; /* 호버 시 부드러운 핑크톤으로 변경 */
  }
`;



export const EventCardSpanImage = styled.img`
  min-width: 80%;
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

export const ListContentContainer = styled.section`
  display: inline-flex;
  margin-top: 20px;
  border-radius: 15px;
  padding: 15px;
  background-color: #fffcf7;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
`;

export const ListContentTagsContainer = styled.aside`
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  min-width: 250px;
  padding: 10px;
  max-width: 250px;
  justify-content: center;
`;

export const ListContentTag = styled.span`
  display: inline-flex; /* 태그가 글씨 크기에 맞도록 inline-flex 사용 */
  align-items: center; /* 태그 안의 텍스트를 수직으로 중앙 정렬 */
  justify-content: center; /* 텍스트가 태그 안에서 중앙에 위치 */
  padding: 5px 10px; /* 텍스트 주변의 여백을 줄임 */
  border: ${({ value }) =>
    value ? 'solid 1px rgba(255, 153, 102, 0.9)' : 'solid 1px rgba(255, 153, 102, 0.8)'}; 
  border-radius: 30px; /* 태그의 모서리를 둥글게 */
  background-color: ${({ value }) => (value ? 'rgba(255, 153, 102, 0.9)' : 'white')};
  color: ${({ value }) => (value ? 'white' : 'black')};
  font-size: 1rem; /* 텍스트 크기를 적절히 설정 */
  margin: 5px;
  transition: background-color 0.3s ease, transform 0.2s ease;
  cursor: pointer;
  user-select: none;

  &:hover {
    background-color: ${({ value }) =>
      value ? 'rgba(255, 102, 51, 1)' : 'rgba(255, 153, 102, 0.4)'};
  }
`;

