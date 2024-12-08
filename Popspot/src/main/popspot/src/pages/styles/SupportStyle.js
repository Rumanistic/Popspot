import styled from 'styled-components';

// 전체 배경
export const SupportContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: auto;
  min-height: 80vh;
  background-color: white;
  font-family: 'Pretendard-Regular', sans-serif;
`;

// FAQ & 고객문의 버튼 컨테이너
export const HorizontalNavContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;	
  margin-top: 50px;
  gap: 250px; /* 텍스트 간 간격 */
`;

// FAQ와 1:1 고객지원 텍스트 스타일
export const NavText = styled.span`
  font-size: 1.3rem;	
  font-weight: bold;
  color: ${({ isActive }) => (isActive ? '#006EB9' : '#1F2933')}; /* 활성화 여부에 따른 색상 */
  cursor: pointer;
  &:hover {
    color: ${({ isActive }) => (isActive ? '#1F2933' : '#006EB9')}; /* 호버 시 색상 변경 */
  }
`;

// FAQ & 1:1 고객지원 버튼 스타일
export const NavMenuButton = styled.div`
  padding: 10px 30px;
  font-size: 1.2rem;
  font-weight: bold;
  text-align: center;
  background-color: ${({ isActive }) => (isActive ? '#1F2933' : '#006EB9')};
  color: ${({ isActive }) => (isActive ? '#006EB9' : '#1F2933')};
  cursor: pointer;

  &:hover {
    background-color: #ffcccc;
  }

  &:active {
    background-color: #ffb3b3;
  }
`;

// 고객문의 틀
export const SectionContainer = styled.section`
  flex-grow: 1;
  background-color: #ffffff;
  border: 1px solid white;
  padding: 20px;
  margin: 0 auto;
  position: relative;
  width: 95%; /* 기본적으로 페이지의 90% 크기 */
  max-width: 1200px; /* 필요 시 최대 너비 제한 */
  min-height: 80vh; /* 초기 페이지 높이 설정 */
`;

// Horizontal Bar (FAQ와 고객지원 상단 고정 바)
export const HorizontalBar = styled.div`
  width: 100%;
  height: 50px;
  background-color: #006EB9;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 30px;
`;
