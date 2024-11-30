import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import { 
  Input, 
  Button, 
  ErrorMessage, 
  Container 
} from '../styles/FindPasswordStyle'; // 스타일 컴포넌트 임포트

function FindPassword() {
  const [userId, setUserId] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState(''); // 전화번호 상태
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [newPassword, setNewPassword] = useState(''); // 새로운 비밀번호 상태
  const [isVerified, setIsVerified] = useState(false); // 정보 검증 여부
  const navigate = useNavigate();

  const handleFindPassword = () => {
    // 서버에 아이디, 이메일, 전화번호로 비밀번호 재설정 요청
    axios.post('/api/users/find-password', { userId, email, phone })
      .then(response => {
        if (response.data.success) {
          setIsVerified(true); // 검증 성공 시 비밀번호 변경 가능
          setMessage('정보가 확인되었습니다. 새로운 비밀번호를 입력하세요.');
          setError(''); // 성공 시 에러 메시지 초기화
        } else {
          setError(response.data.message || '정보를 찾을 수 없습니다.'); // 서버에서 받은 메시지 사용
        }
      })
      .catch(() => {
        setError('서버에 문제가 발생했습니다.');
      });
  };

  const handleChangePassword = () => {
    // 서버에 새로운 비밀번호로 변경 요청, phone 필드도 함께 보냅니다
    axios.post('/api/users/change-password', { userId, phone, newPassword })
      .then(response => {
        if (response.data.success) {
          setMessage('비밀번호가 변경되었습니다.');
          setError(''); // 성공 시 에러 메시지 초기화
        } else {
          setError(response.data.message || '비밀번호 변경에 실패했습니다.'); // 서버에서 받은 메시지 사용
        }
      })
      .catch(() => {
        setError('서버에 문제가 발생했습니다.');
      });
  };

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    setError(''); // 입력 필드 변경 시 에러 메시지 초기화
  };

  const goToLogin = () => {
    navigate('/login'); // 로그인 페이지로 이동
  };

  return (
    <Container>
      <h2>비밀번호 찾기</h2>
      {!isVerified ? (
        <>
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
          <Input
            type="password"
            placeholder="새로운 비밀번호를 입력하세요"
            value={newPassword}
            onChange={handleInputChange(setNewPassword)} 
          />
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <Button onClick={handleChangePassword}>비밀번호 변경</Button>
        </>
      )}
      {message && <p>{message}</p>}
      <Button onClick={goToLogin}>로그인 화면으로 돌아가기</Button>
    </Container>
  );
}

export default FindPassword;
