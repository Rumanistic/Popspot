import { Route, Routes, useNavigate } from 'react-router-dom';
import Faq from './support/Faq';
import UserSupport from './support/UserSupport';
import * as SupportStyle from './styles/SupportStyle'
import UserSupportDetail from './support/UserSupportDetail';
import UserSupportRegister from './support/UserSupportRegister';

function Support() {

	const navigate = useNavigate();
	
  return (
    <SupportStyle.SupportContainer>
    	<SupportStyle.AsideNavContainer>
    		<SupportStyle.AsideNavMenuContainer>
    			<ul>
	    			<SupportStyle.NavMenuContent onClick={() => { navigate('/support/faq')}}>FAQ</SupportStyle.NavMenuContent>
	    			<SupportStyle.NavMenuContent onClick={() => { navigate('/support/usersupport')}}>1:1 고객지원</SupportStyle.NavMenuContent>
    			</ul>
    		</SupportStyle.AsideNavMenuContainer>
    	</SupportStyle.AsideNavContainer>
    	<SupportStyle.SectionContainer>
  			<Routes>
  				<Route path='faq' element={<Faq />}/>
  				<Route path='usersupport' element={<UserSupport />}/>
  				<Route path='usersupport/detail' element={<UserSupportDetail />}/>
  				<Route path='usersupport/register' element={<UserSupportRegister />}/>
  			</Routes>
    	</SupportStyle.SectionContainer>
    </SupportStyle.SupportContainer>
  );
}


export default Support;