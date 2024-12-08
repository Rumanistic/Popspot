import { Route, Routes, useNavigate } from 'react-router-dom';
import React, { useState } from 'react'; // 추가
import Faq from './support/Faq';
import UserSupport from './support/UserSupport';
import * as SupportStyle from './styles/SupportStyle';
import UserSupportDetail from './support/UserSupportDetail';
import UserSupportRegister from './support/UserSupportRegister';

function Support() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('faq'); 

  return (
    <SupportStyle.SupportContainer>
      {/* 상단의 FAQ와 1:1 고객지원 텍스트 */}
      <SupportStyle.HorizontalNavContainer>
        <SupportStyle.NavText
          isActive={activeTab === 'faq'} // FAQ 활성화 여부
          onClick={() => {
            setActiveTab('faq'); // 활성 탭 변경
            navigate('/support/faq'); // 페이지 이동
          }}
        >
          FAQ
        </SupportStyle.NavText>
        <SupportStyle.NavText
          isActive={activeTab === 'usersupport'} // 1:1 고객지원 활성화 여부
          onClick={() => {
            setActiveTab('usersupport'); // 활성 탭 변경
            navigate('/support/usersupport'); // 페이지 이동
          }}
        >
          1:1 고객지원
        </SupportStyle.NavText>
      </SupportStyle.HorizontalNavContainer>

      <SupportStyle.SectionContainer>
        <Routes>
          <Route path="faq" element={<Faq />} />
          <Route path="usersupport" element={<UserSupport />} />
          <Route path="usersupport/detail" element={<UserSupportDetail />} />
          <Route path="usersupport/register" element={<UserSupportRegister />} />
        </Routes>
      </SupportStyle.SectionContainer>
    </SupportStyle.SupportContainer>
  );
}

export default Support;

