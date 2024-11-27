import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './styles/HeaderStyle.css'; // CSS 파일 import

function Header({user, setUser}) {
  // 로그인 상태를 관리하는 state
  const [search, setSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.clear();
    setUser(null);
    alert("로그아웃 되었습니다!");
    navigate('/main'); // 메인 페이지로 이동
  };

  return (
    <header className="header-all">
      <img src="/img/logo.png" alt="" style={{float: 'left'}}/>
      <span className="header-logo" onClick={() => { navigate('/') }}>
        POPSPOT
      </span>
      <nav className="header-nav-menu">
        <ul className="nav-menu-container">
          <li className="nav-menu-content" onClick={() => { navigate('/popup') }}>Pop-up</li>
          <li className="nav-menu-content" onClick={() => { navigate('/support/faq') }}>Support</li>
          
	        {/* 검색 버튼 추가 */}
	        <li className="nav-menu-search-container">
	          <span className={`nav-menu-search-content ${search ? 'expanded':''}`}>
	          	<img 
	          		src="/img/search-icon.png" 
	          		alt="Search" 
	          		className="search-icon"
	          		onClick={() => {setSearch(!search)}}
          		/>
          		{search && 
	          		<span style={{display: 'flex'}}>
	          			<input 
	          				className="nav-menu-search-text"
	          				onChange={(e) => {setSearchQuery(e.target.value)}}
          				/>
	          			<img 
			          		src="/favicon.png" 
			          		alt="Search" 
			          		className="search-icon"
			          		onClick={() => {setSearch(!search)}}
		          		/>
	          		</span>
          		}
	          </span>
	        </li>

        </ul>
        {user ? (
					<span className={"header-login"}>
            <span>{user}님 환영합니다!&ensp;&ensp;&ensp;</span>
            <span className="nav-menu-content" onClick={() => { navigate('/mypage') }}>My Page</span>
            <span className="nav-menu-content" onClick={handleLogout}>LogOut</span>
          </span>
        ) : (
          <span className={"header-login"} onClick={() => { navigate('/login') }}>Login</span>
        )}
      </nav>
    </header>
  );
}

export default Header;
