import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { updateProfile } from '../store/actions/authActions';  
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [email, setEmail] = useState('');	
  const [name, setName] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [TemporaryPassword, setTemporaryPassword] = useState('');
  const [error, setError] = useState('');
  const [isEmailConfirmed, setIsEmailConfirmed] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== TemporaryPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }
    dispatch(updateProfile({ password: newPassword }))
      .then(() => {
        alert('비밀번호가 변경되었습니다.');
        setTemporaryPassword('');
        navigate('/login');
      })
      .catch((err) => {
        setError('비밀번호 변경에 실패했습니다.');
      });
  };
  
   const EchkSubmit = (e) => { 
	   e.preventDefault();
	  if (email === 'test@example.com' && name === 'user01') {
	    alert("사용자가 확인되었습니다."); 
	    setIsEmailConfirmed(true);
	    setTemporaryPassword('1234');
	  	return;
	  } else {
	    setError("가입된 회원이 아닙니다.");
	  }
   }; 

  return (
    <ProfileContainer>
   	 <TitleContainer>
      <h2>회원정보 수정</h2>
      </TitleContainer>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Form onSubmit={EchkSubmit}>
        <div>
          <Label>이름</Label>
          <Input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder="이름을 입력하세요" 
          />
      	</div>
      	<div>
        <Label>이메일</Label>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="회원가입된 이메일을 입력하세요"
        />
        </div>
        <Button type="submit">이메일 확인</Button>
      </Form>
      <Form onSubmit={handleSubmit}>        
        <Label>새 비밀번호</Label>
        <Input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="새 비밀번호를 입력하세요"
          disabled={!isEmailConfirmed} 
        />
        <Label>비밀번호 확인</Label>
        <Input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="비밀번호를 다시 입력하세요"
          disabled={!isEmailConfirmed} 
        />
        <Button type="submit">비밀번호 변경</Button>
      </Form>
    </ProfileContainer>
  );
};

export default Profile;

const ProfileContainer = styled.div`
  margin-top: 100px;
  margin-left: 680px;
  width: 370px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #f9f9f9;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: left;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-top: 10px;
  font-size: 14px;
  padding: 3px;
  text-align: left;
`;

const Input = styled.input`
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 90%;
`;

const Button = styled.button`
  padding: 10px;
  margin-top: 15px;
  margin-bottom: 20px;
  margin-left: 55px;
  background-color: #5cb85c;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 70%;  
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
`;
