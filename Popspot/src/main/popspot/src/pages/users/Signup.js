import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  SignupContainer,
  Title,
  Form,
  Label,
  Input,
  ErrorMessage,
  SuccessMessage,
  Button,
  Select, 
} from '../styles/SignUpStyle'; 

const Signup = () => {
  const [userData, setUserData] = useState({
    email: '',
    userId: '',
    userPwd: '',
    name: '',
    phone: '',
    address: '',
    birthdate: '', // 생년월일 추가
    accountType: '',
  });
  const [isUserIdAvailable, setIsUserIdAvailable] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [isAccountTypeSelected, setIsAccountTypeSelected] = useState(false); 
  const navigate = useNavigate();

  const handleAccountTypeChange = (e) => {
    setUserData({ ...userData, accountType: e.target.value });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'phone') {
      const phoneValue = value.replace(/-/g, ''); 
      setUserData({ ...userData, phone: phoneValue });
    } else {
      setUserData({ ...userData, [name]: value });
    }

    setFieldErrors({ ...fieldErrors, [name]: '' });
  };

  const checkUserId = () => {
    if (!userData.userId) return;

    axios.post(`/api/users/check-username/${userData.userId}`)
      .then(response => {
        if (response.data) {
          setIsUserIdAvailable(true);
          setErrorMessage('');
        } else {
          setIsUserIdAvailable(false);
          setErrorMessage('이미 사용 중인 아이디입니다.');
        }
      })
      .catch(err => {
        console.error('아이디 중복 체크 중 오류 발생:', err);
        setErrorMessage('아이디 중복 체크에 실패했습니다.');
      });
  };

  const calculateAge = (birthdate) => {
    const today = new Date();
    const birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = {};
    if (!userData.email) {
      errors.email = '이메일을 입력해 주세요.';
    } else if (!userData.email.includes('@')) {
      errors.email = '올바른 이메일 주소를 입력해 주세요.';
    }

    if (!userData.userId) errors.userId = '아이디를 입력해 주세요.';
    if (!userData.userPwd) errors.userPwd = '비밀번호를 입력해 주세요.';
    if (!userData.name) errors.name = '이름을 입력해 주세요.';
    if (!userData.birthdate) {
      errors.birthdate = '생년월일을 입력해 주세요.';
    } else if (calculateAge(userData.birthdate) < 14) {
      errors.birthdate = '14세 이상만 가입할 수 있습니다.';
    }

    const phoneRegex = /^(010|011)\d{7,8}$/;
    if (!userData.phone) {
      errors.phone = '휴대폰 번호를 입력해 주세요.';
    } else if (!phoneRegex.test(userData.phone)) {
      errors.phone = '올바른 휴대폰 번호를 입력해 주세요.';
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    if (isUserIdAvailable === false) {
      alert('아이디를 다시 확인해 주세요.');
      return;
    }

    const userToSubmit = {
      ...userData,
      type: userData.accountType,
    };

    axios.post('/api/users/sign-up', userToSubmit)
      .then(() => {
        alert('회원가입이 완료되었습니다');
        navigate('/login');
      })
      .catch(err => {
        console.error('서버 요청 중 오류가 발생했습니다.', err);
        alert('서버 오류가 발생했습니다. 다시 시도해 주세요.');
      });
  };

  const handleSelectAccountType = (e) => {
    e.preventDefault();
    if (!userData.accountType) {
      alert('계정 타입을 선택해 주세요.');
    } else {
      setIsAccountTypeSelected(true); 
    }
  };

  return (
    <SignupContainer>
      {!isAccountTypeSelected ? (
        <Form onSubmit={handleSelectAccountType}>
          <Label>계정 타입을 선택해 주세요</Label>
          <Select
            name="accountType"
            value={userData.accountType}
            onChange={handleAccountTypeChange}
          >
            <option value="">계정 타입 선택</option>
            <option value="0">관리자</option>
            <option value="1">기획자</option>
            <option value="2">사업자</option>
            <option value="3">일반 사용자</option>
          </Select>
          <Button type="submit">확인</Button>
        </Form>
      ) : (
        <Form onSubmit={handleSubmit}>
          <Title>회원가입</Title>

          <Label>이메일</Label>
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={userData.email}
            onChange={handleChange}
          />
          {fieldErrors.email && <ErrorMessage>{fieldErrors.email}</ErrorMessage>}

          <Label>아이디</Label>
          <Input
            type="text"
            name="userId"
            placeholder="userId"
            value={userData.userId}
            onChange={handleChange}
            onBlur={checkUserId}
          />
          {isUserIdAvailable === false && <ErrorMessage>{errorMessage}</ErrorMessage>}
          {isUserIdAvailable === true && <SuccessMessage>사용 가능한 아이디입니다.</SuccessMessage>}
          {fieldErrors.userId && <ErrorMessage>{fieldErrors.userId}</ErrorMessage>}

          <Label>비밀번호</Label>
          <Input
            type="password"
            name="userPwd"
            placeholder="Password"
            value={userData.userPwd}
            onChange={handleChange}
          />
          {fieldErrors.userPwd && <ErrorMessage>{fieldErrors.userPwd}</ErrorMessage>}

          <Label>이름</Label>
          <Input
            type="text"
            name="name"
            placeholder="Name"
            value={userData.name}
            onChange={handleChange}
          />
          {fieldErrors.name && <ErrorMessage>{fieldErrors.name}</ErrorMessage>}

          <Label>생년월일</Label>
          <Input
            type="date"
            name="birthdate"
            placeholder="생년월일"
            value={userData.birthdate}
            onChange={handleChange}
          />
          {fieldErrors.birthdate && <ErrorMessage>{fieldErrors.birthdate}</ErrorMessage>}

          <Label>휴대폰번호</Label>
          <Input
            type="text"
            name="phone"
            placeholder="Phone"
            value={userData.phone}
            onChange={handleChange}
          />
          {fieldErrors.phone && <ErrorMessage>{fieldErrors.phone}</ErrorMessage>}

          <Label>주소</Label>
          <Input
            type="text"
            name="address"
            placeholder="주소 (선택 사항)"
            value={userData.address}
            onChange={handleChange}
          />

          <Button type="submit">회원가입</Button>
        </Form>
      )}
    </SignupContainer>
  );
};

export default Signup;
