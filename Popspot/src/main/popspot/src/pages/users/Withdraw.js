import React, { useState } from 'react'; // useState를 함께 import
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  WithdrawContainer,
  Title,
  Form,
  Label,
  Input,
  ErrorMessage,
  Button,
} from '../styles/WithdrawStyle';

const Withdraw = () => {
  const [userData, setUserData] = useState({
    userId: '',
    userPwd: '',
    phone: '',
    email: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
    setErrorMessage('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!userData.userId || !userData.userPwd || !userData.phone || !userData.email) {
      setErrorMessage('모든 필드를 입력해 주세요.');
      return;
    }
  
    // 사용자에게 탈퇴 확인 요청
    const isConfirmed = window.confirm('정말로 탈퇴하시겠습니까? 탈퇴 후에는 복구가 불가능합니다.');
    
    if (!isConfirmed) {
      return; // 취소한 경우 아무 처리도 하지 않음
    }
  
    // 탈퇴 처리 진행
    axios.post('/api/users/withdraw', userData)
      .then(() => {
        alert('회원 탈퇴가 완료되었습니다.');
        
        // 로그아웃 처리
        sessionStorage.clear();
        
        navigate('/'); // 메인 페이지로 이동
        window.location.reload(); // 상태 업데이트를 위해 페이지 리로드
      })
      .catch(err => {
        console.error('서버 요청 중 오류가 발생했습니다.', err);
        alert('서버 오류가 발생했습니다. 다시 시도해 주세요.');
      });
  };
  
  return (
    <WithdrawContainer>
      <Title>회원 탈퇴</Title>
      <Form onSubmit={handleSubmit}>
        <Label>아이디</Label>
        <Input
          type="text"
          name="userId"
          placeholder="아이디"
          value={userData.userId}
          onChange={handleChange}
        />

        <Label>비밀번호</Label>
        <Input
          type="password"
          name="userPwd"
          placeholder="비밀번호"
          value={userData.userPwd}
          onChange={handleChange}
        />

        <Label>전화번호</Label>
        <Input
          type="text"
          name="phone"
          placeholder="전화번호"
          value={userData.phone}
          onChange={handleChange}
        />

        <Label>이메일</Label>
        <Input
          type="email"
          name="email"
          placeholder="이메일"
          value={userData.email}
          onChange={handleChange}
        />

        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        <Button type="submit">회원 탈퇴</Button>
      </Form>
    </WithdrawContainer>
  );
};

export default Withdraw;
