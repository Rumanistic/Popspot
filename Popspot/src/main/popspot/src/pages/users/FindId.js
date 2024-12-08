import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Input,
  Button,
  ErrorMessage,
  Container,
  Content,
  TabText,
  BackText,
  StyledFindImg,
} from '../styles/FindIdStyle'; // 수정된 스타일

function FindId() {
  const [activeTab, setActiveTab] = useState('findId'); // 'findId' or 'findPassword'
  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState('');
  const [phone, setPhone] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isVerified, setIsVerified] = useState(false); // 비밀번호 변경 여부
  const navigate = useNavigate();

  const handleFindId = () => {
    axios.post('/api/users/find-id', { email })
      .then(response => {
        if (response.status === 200) {
          setMessage(`아이디는 ${response.data.userId}입니다.`);
        } else {
          setError('아이디를 찾을 수 없습니다.');
        }
      })
      .catch(() => {
        setError('서버에 문제가 발생했습니다.');
      });
  };

  const handleFindPassword = () => {
    axios.post('/api/users/find-password', { userId, email, phone })
      .then((response) => {
        if (response.data.success) {
          setIsVerified(true);
          setMessage('정보가 확인되었습니다. 새로운 비밀번호를 입력하세요.');
          setError('');
        } else {
          setError(response.data.message || '정보를 찾을 수 없습니다.');
        }
      })
      .catch(() => {
        setError('서버에 문제가 발생했습니다.');
      });
  };

  const handleChangePassword = () => {
    axios.post('/api/users/change-password', { userId, phone, newPassword })
      .then((response) => {
        if (response.data.success) {
          setMessage('비밀번호가 변경되었습니다.');
          setError('');
          setIsVerified(false); // 상태 초기화
        } else {
          setError(response.data.message || '비밀번호 변경에 실패했습니다.');
        }
      })
      .catch(() => {
        setError('서버에 문제가 발생했습니다.');
      });
  };

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    setError('');
  };

  const goToLogin = () => {
    navigate('/login');
  };

  // 탭 변경 시 상태 초기화
  useEffect(() => {
    setEmail('');
    setUserId('');
    setPhone('');
    setNewPassword('');
    setMessage('');
    setError('');
    setIsVerified(false); // 비밀번호 재설정 여부 초기화
  }, [activeTab]);

  return (
    <Container>
      <div>
        <TabText
          active={activeTab === 'findId'}
          onClick={() => setActiveTab('findId')}
        >
          아이디 찾기
        </TabText>
        {' | '}
        <TabText
          active={activeTab === 'findPassword'}
          onClick={() => setActiveTab('findPassword')}
        >
          비밀번호 찾기
        </TabText>
      </div>
      <br />
      <Content>
        {activeTab === 'findId' ? (
          <>
            <StyledFindImg src='/findId.png' alt='findId'></StyledFindImg>
            <h2>아이디 찾기</h2>
            <Input
              type="email"
              placeholder="이메일을 입력하세요"
              value={email}
              onChange={handleInputChange(setEmail)}
            />
            {error && <ErrorMessage>{error}</ErrorMessage>}
            {message && <p>{message}</p>}
            <br />
            <Button onClick={handleFindId}>아이디 찾기</Button>
          </>
        ) : !isVerified ? (
          <>
           <StyledFindImg src='/findPwd.png' alt='findId'></StyledFindImg>
            <h2>비밀번호 찾기</h2>
            <Input
              type="text"
              placeholder="아이디를 입력하세요"
              value={userId}
              onChange={handleInputChange(setUserId)}
            />
            <Input
              type="email"
              placeholder="이메일을 입력하세요"
              value={email}
              onChange={handleInputChange(setEmail)}
            />
            <Input
              type="text"
              placeholder="전화번호를 입력하세요"
              value={phone}
              onChange={handleInputChange(setPhone)}
            />
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <Button onClick={handleFindPassword}>비밀번호 찾기</Button>
          </>
        ) : (
          <>
            <h2>비밀번호 재설정</h2>
            <Input
              type="password"
              placeholder="새로운 비밀번호를 입력하세요"
              value={newPassword}
              onChange={handleInputChange(setNewPassword)}
            />
            {error && <ErrorMessage>{error}</ErrorMessage>}
            {message && <p>{message}</p>}
            <Button onClick={handleChangePassword}>비밀번호 변경</Button>
          </>
        )}
      </Content>
      <br />
      <BackText onClick={goToLogin}>로그인 화면으로 돌아가기</BackText>
    </Container>
  );
}

export default FindId;
