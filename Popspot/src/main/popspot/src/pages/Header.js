import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './styles/HeaderStyle.css'; // CSS 파일 import
import axios from "axios";

function Header({user, setUser}) {
  const [search, setSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false); // 검색 모달 추가

  const handleLogout = () => {
    sessionStorage.clear();
    setUser(null);
    alert("로그아웃 되었습니다!");
    navigate('/main'); // 메인 페이지로 이동
  };

  const searchKeyword = () => {
    axios.get(`/api/event/search/keyword`, { params: { keyword: searchQuery } })
      .then((response) => {
        if (response.data.eList.length > 0) {
          setSearch(true);
          // setSearchResults(response.data); // 검색 결과 전달
          setSearchQuery('');
          console.log('검색결과 헤더확인 : ', response);
          navigate('/popup', { state: response.data });
        } else {
          alert("검색 결과가 없습니다.");
        }
      })
      .catch((error) => {
        console.error("검색 오류:", error);
      });
  };

  return (
    <header className="header-all">
      <img 
       src="/img/logo.png" 
       alt="logoimg" 
       className="logo-image"
       onClick={() => { navigate('/') }}
      />

      {/* 네비게이션 메뉴 */}
      <div className="header-nav-menu">
        <div className="nav-menu-container">
          <div className="nav-menu-content" onClick={() => { navigate('/popup') }}>POPUP</div>
          <div className="nav-menu-content" onClick={() => { navigate('/support/faq') }}>SUPPORT</div> 
          <img // 클릭 시 모달 열림 
            src="/img/search-icon.png"
            alt="Search"
            className="search-icon"
            onClick={() => setModalOpen(true)}
          />
        </div>
        
        {/* 로그인 상태 표시 */}
        {user ? (
					<div className={"header-login"}>
            <span className="login-content">{user}님</span>
            <span className="login-content" onClick={() => { navigate('/mypage') }}>마이페이지</span>
            <span className="login-content" onClick={handleLogout}>로그아웃</span>
          </div>
        ) : (
            <span className={"header-login"} onClick={() => { navigate('/login') }}>로그인</span>
        )}

        {/* 모달창 안 검색으로 바꿈 */}
        {isModalOpen && (
          <div className="modal-overlay" onClick={() => setModalOpen(false)}> 
            <div className="modal-box" onClick={(e) => e.stopPropagation()}> 
                  <div className="nav-menu-search-content">
                    <input
                      className="nav-menu-search-text"
                      onChange={(e) => { setSearchQuery(e.target.value) }}
                      value={searchQuery}
                      placeholder="Search Keyword"
                    />
                    <img
                      src="/img/search-icon.png"
                      alt="Search"
                      className="search-icon"
                      onClick={searchKeyword}
                    />
                  </div>
                  <button className="close-button" onClick={() => setModalOpen(false)}>닫기</button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;