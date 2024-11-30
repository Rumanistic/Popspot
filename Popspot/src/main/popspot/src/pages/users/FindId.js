import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate import 추가
import axios from 'axios';
import { 
  Input, 
  Button, 
  ErrorMessage, 
  Container 
} from '../styles/FindIdStyle';

function FindId() {
  const [email, setEmail] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // useNavigate 훅 사용

  const handleFindId = () => {
    // 서버에 이메일로 아이디 찾기 요청
    axios.post('/api/users/find-id', { email })
      .then(response => {
        if (response.data.success) {
          setResult(`아이디는 ${response.data.userId}입니다.`);
        } else {
          setError('아이디를 찾을 수 없습니다.');
        }
      })
      .catch(() => {
        setError('서버에 문제가 발생했습니다.');
      });
  };

  const goToLogin = () => {
    navigate('/login'); // 로그인 페이지로 이동
  };

  return (
    <Container>
      <h2>아이디 찾기</h2>
      <Input
        type="email"
        placeholder="이메일을 입력하세요"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {result && <p>{result}</p>}
      <Button onClick={handleFindId}>아이디 찾기</Button>
      <Button onClick={goToLogin}>로그인 화면으로 돌아가기</Button>
    </Container>
  );
}

export default FindId;
