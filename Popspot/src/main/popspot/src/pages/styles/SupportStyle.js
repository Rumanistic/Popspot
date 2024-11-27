import styled from 'styled-components';

//전체 배경
export const SupportContainer = styled.div`
  display: flex;
  width: 100%;
  margin: auto;
  padding: 20px 20px 20px 20px;
  min-height: 80vh;
  background-color: white; 
  border-radius: 20px;
  font-family: 'Pretendard-Regular' sans-serif;
`;

// FAQ & 고객문의 사이드
export const AsideNavContainer = styled.aside`
  min-width: 200px;
  background-color: #fffcf7; 
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  padding: 15px;
  margin-right: 20px;
}
`;

// FAQ & 고객문의 버튼
export const AsideNavMenuContainer = styled.nav`
  width: 100%;
`;

// 고객문의 버튼
export const RegisterButton = styled.button`
  background-color:  #ff8f8f;
  font-size: 20px;
  padding: 10px 20px;
  border-radius: 10px; 
  border-color: transparent; 
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ffcccc;
  }
`;

// FAQ & 고객문의 버튼
export const NavMenuContent = styled.li`
  list-style: none;
  padding: 10px 20px;
  margin: 35px 0;
  font-size: 1.2rem;
  background-color: #FFA2A2; 
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #ffcccc;
    transform: scale(1.05); 
  }

  &:active {
    background-color: #ffb3b3;
  }
`;

// 고객문의 틀
export const SectionContainer = styled.section`
  flex-grow: 1;
  background-color: #fffcf7;
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin: 0 auto;
`;
