import styled from 'styled-components';

// 전체 컨테이너 
export const SupportContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: auto;
  min-height: 80vh;
  background-color: white; 
  font-family: 'Pretendard-Regular', sans-serif;
`;

// 네비게이션 컨테이너
export const AsideNavContainer = styled.aside`
  display: flex;
  flex-direction: row;
  justify-content: center; 
  align-items: center; 
  margin-bottom: -25px;
  background-color: white; 
  padding: 15px 0; /* 위아래 여백 */
  width: 100%; 
`;

// 메뉴 컨테이너 
export const AsideNavMenuContainer = styled.nav`
  display: inline-flex; 
  flex-direction: row; 
  gap: 20px; 
  justify-content: center; 
  align-items: center; 
  width: auto; 
`;

// 버튼 스타일
export const NavMenuContent = styled.li`
  list-style: none;
  color: #006EB9; 
  font-size: 1.3rem; 
  font-weight: bold; 
  padding: 8px 16px; 
  margin: 0; 
  background-color: transparent;
  border: none; 
  cursor: pointer;
  border-bottom: ${(props) => (props.isActive ? '2px solid #006EB9' : 'none')}; /* 활성화된 버튼 하단선 */
  transition: color 0.3s ease, border-bottom 0.3s ease;

  &:hover {
    color: #004a89; /* 호버 시 더 진한 파란색 */
  }
`;

// 컨텐츠 영역 (FAQ & 1:1 고객지원 내용 포함)
export const SectionContainer = styled.section`
  flex-grow: 1;
  padding: 20px;
  background-color: white; /* 배경 흰색 */
  margin: 0 auto;
`;
