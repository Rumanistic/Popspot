import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  MyPageContainer,
  MyPageTitle,
  MyPageButton,
  InfoContainer,
  InputField,
  ErrorMessage
} from '../styles/MyPageStyle'; // MyPage에 맞는 스타일 컴포넌트만 임포트

const MyPage = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [password, setPassword] = useState('');
  const [isPasswordVerified, setIsPasswordVerified] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // 수정 모드 상태
  const [error, setError] = useState('');

  // 현재 로그인된 사용자의 ID를 가져옴
  const savedUser = sessionStorage.getItem('userId');
  console.log(savedUser);
  
  const handlePasswordCheck = () => {
    // 비밀번호가 입력되지 않았을 경우 오류 메시지 설정
    if (!password) {
      setError('비밀번호를 입력하세요.');
      return;
    }

    // 서버에 비밀번호 확인 요청
    axios.post('/api/users/verify-password', { userId: savedUser, userPwd: password })
      .then(response => {
		  //20241207 todo
        if (response.status === 200) {
          setUserInfo(response.data); // 성공 시 사용자 정보 설정
          setIsPasswordVerified(true);
          setError('');
        } else {
          setError('비밀번호가 일치하지 않습니다.');
        }
      })
      .catch(error => {
        console.error('비밀번호 확인 중 오류가 발생했습니다.', error);
        setError('서버 오류가 발생했습니다. 다시 시도해 주세요.');
      });
  };

  const handleInputChange = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveChanges = () => {
    // 서버에 수정된 사용자 정보 업데이트 요청
    axios.post('/api/users/update-user-info', userInfo)
      .then(response => {
        if (response.status === 204) {
          setIsEditing(false);
          alert('회원 정보가 수정되었습니다.');
        } else {
          setError('회원 정보 수정에 실패했습니다.');
        }
      })
      .catch(error => {
        console.error('회원 정보 수정 중 오류가 발생했습니다.', error);
        setError('서버 오류가 발생했습니다. 다시 시도해 주세요.');
      });
  };

  const handleWithdraw = () => {
    // 회원 탈퇴 폼으로 이동
    navigate('/withdraw');
  };

  // 전화번호를 '010-1234-5678' 형식으로 변환하는 함수
  const formatPhoneNumber = (phone) => {
    if (!phone.includes('-')) {
      return phone.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
    }
    return phone;
  };

  return (
    <MyPageContainer>
      <MyPageTitle>마이 페이지</MyPageTitle>

      {!isPasswordVerified ? (
        <div>
          <InputField
            type="password"
            placeholder="비밀번호를 입력하세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <MyPageButton onClick={handlePasswordCheck}>확인</MyPageButton>
        </div>
      ) : (
        <InfoContainer>
          {isEditing ? (
            <div>
              <p><strong>아이디:</strong> {userInfo.userId}</p>
              <p>
                <strong>이름:</strong>
                <InputField
                  type="text"
                  name="name"
                  value={userInfo.name}
                  onChange={handleInputChange}
                />
              </p>
              <p>
                <strong>이메일:</strong>
                <InputField
                  type="email"
                  name="email"
                  value={userInfo.email}
                  onChange={handleInputChange}
                />
              </p>
              <p>
                <strong>전화번호:</strong>
                <InputField
                  type="text"
                  name="phone"
                  value={userInfo.phone}
                  onChange={handleInputChange}
                />
              </p>
              <MyPageButton onClick={handleSaveChanges}>저장</MyPageButton>
              <br /><br />
              <MyPageButton onClick={() => setIsEditing(false)}>취소</MyPageButton>
            </div>
          ) : (
            <div>
              <p><strong>아이디:</strong> {userInfo.userId}</p>
              <p><strong>이름:</strong> {userInfo.name}</p>
              <p><strong>이메일:</strong> {userInfo.email}</p>
              <p><strong>전화번호:</strong> {formatPhoneNumber(userInfo.phone)}</p>
              <MyPageButton onClick={() => setIsEditing(true)}>수정</MyPageButton>
            </div>
          )}
          <br />
          <MyPageButton onClick={handleWithdraw}>회원 탈퇴</MyPageButton>
        </InfoContainer>
      )}
    </MyPageContainer>
  );
};

export default MyPage;
