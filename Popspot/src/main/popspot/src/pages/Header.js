import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './styles/HeaderStyle.css';
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import React, { useEffect} from "react";

function Header({user, setUser}) {
  // 로그인 상태를 관리하는 state
  const [search, setSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false); // 검색 모달 추가
  const [tags, setTags] = useState([]);

  const handleLogout = () => {
    sessionStorage.clear();
    setUser(null);
    alert("로그아웃 되었습니다!");
    navigate('/main'); // 메인 페이지로 이동
    window.location.reload();
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
          setSearchQuery('');
        }
      })
      .catch((error) => {
        console.error("검색 오류:", error);
      });
  };

  function EnterKeyDown(e) {
    if (e.key === 'Enter') {
      if (searchQuery.trim()) {
        searchKeyword(); // 검색 실행
      }
    }
  }

  const handleTagClick = (tag) => {
    axios.get(`/api/event/search/tags`, { params: { tags: tag } })
      .then((response) => navigate('/popup', { state: response.data }))
      .catch((error) => console.error("태그 검색 오류:", error));
  };

  function EnterKeyDown(e) {
    if (e.key === 'Enter' && searchQuery.trim()) {
      searchKeyword();
    }
  }

  useEffect(() => {
    fetchTags(); // 컴포넌트가 마운트될 때 태그 가져오기
  }, []);

  const fetchTags = () => {
    axios.get(`/api/event/tags`) // 서버에서 태그 가져오기
      .then((response) => setTags(response.data))
      .catch((error) => console.error("태그 가져오기 오류:", error));
  };

  return (
    <header className="header-all">
      <img 
       src="/img/logo.png" 
       alt="logoimg" 
       className="logo-image"
       style={{ cursor: "pointer" }}
       onClick={() => { navigate('/') }}
      />

      {/* 네비게이션 메뉴 */}
      <div className="header-nav-menu">
        <div className="nav-menu-container">
          <div className="nav-menu-content" onClick={() => { navigate('/popup') }} style={{ cursor: "pointer" }}>POPUP</div>
          <div className="nav-menu-content" onClick={() => { navigate('/support/faq') }} style={{ cursor: "pointer" }}>SUPPORT</div>
          
          <FaSearch
            className="search-icon"
            onClick={() => setModalOpen(true)}
            style={{ cursor: "pointer" }}
          />
        </div>
        {/* 모달창 안 검색으로 바꿈 */}
        {isModalOpen && (
          <div className="modal-overlay" onClick={() => setModalOpen(false)}> 
            <div className="modal-box" onClick={(e) => e.stopPropagation()}> 
              <span className="nav-menu-search-content">
                <span className="nav-menu-search">
                  <input 
                    className="nav-menu-search-text"
                    onChange={(e) => {setSearchQuery(e.target.value)}}
                    onKeyDown={EnterKeyDown}
                    value={searchQuery}
                    placeholder="SEARCH KEYWORD"
                  />
                  <FaSearch
                    alt="Search" 
                    className="search-button"
                    onClick={searchKeyword}
                    style={{ cursor: "pointer" }}
                  />
                  <div className="tag-container"> {/* 태그 추가 */}
                  {tags.slice(0, 7).map((tag, index) => (
                      <span
                        key={index}
                        className="tag-item"
                        onClick={() => handleTagClick(tag)}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </span>
              </span>
            </div>
          </div>
        )}
        {user ? (
					<span className={"header-login"}>
            <span className="login-content">{user}님</span>
            <span className="login-content" onClick={() => { navigate('/mypage') }}>마이페이지</span>
            <span className="login-content" onClick={handleLogout}>로그아웃</span>
          </span>
        ) : (
          <span className={"header-login"} onClick={() => { navigate('/login') }}>로그인</span>
        )}
      </div>
    </header>
  );
}

export default Header;
