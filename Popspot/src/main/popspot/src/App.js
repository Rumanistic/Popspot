import './App.css';
import Main from './pages/Main';
import Support from './pages/Support'
import Login from './pages/Login';
import Profile from './pages/users/Profile';
import Signup from './pages/users/Signup';
import { Route, Routes, useLocation } from 'react-router-dom';
import EventDetail from './pages/event/EventDetail';
import Review from './pages/event/Review';
import UserSupportDetail from './pages/support/UserSupportDetail';
import FindId from './pages/users/FindId';
import FindPassword from './pages/users/FindPassword';
import MyPage from './pages/users/MyPage';
import Withdraw from './pages/users/Withdraw';
import EventSubmit from './pages/event/EventSubmit';
import EventEdit from './pages/event/EventEdit';
import { useEffect, useState } from 'react';
import EventList from './pages/event/EventList';


function App({user, setUser}) {
	
	const [permissions, setPermissions] = useState(sessionStorage.getItem("permissions"));
	const [tag, setTag] = useState('');
	const location = useLocation();
	
	useEffect(() => {
    setPermissions(sessionStorage.getItem("permissions"));
  }, [user]);
  
  const noPermissionRoutes = [
		{ path:'/', element: <Main />},
		{ path:'/login', element: <Login setUser={setUser}/>},
		{ path:'/popup', element: <EventList  key={location.key} />},
		{ path:'/main', element: <Main setTag={setTag}/>},
		{ path:'/popup/tag?', element: <EventList tag={tag}/>},
		{ path:'/event/:no', element: <EventDetail />},
		{ path:'/review', element: <Review />},
		{ path:'/support/*', element: <Support />},
		{ path:'/signup', element:<Signup />},
		{ path:'/find-id', element: <FindId />},
		{ path:'/find-password', element: <FindPassword />}
	];
  
  const userPermissionRoutes = [
		{ path:'/support/usersupport/detail/:no', element: <UserSupportDetail />},
		{ path:'/profile', element: <Profile />},
		{ path:'/mypage', element: <MyPage />},
		{ path:'/withdraw', element: <Withdraw />}
	];
  
  const plannerPermissionRoutes = [
		{path: '/popup/submit', element: <EventSubmit />},
		{path: '/popup/edit', element: <EventEdit />}
	];
	
  return (
	
    <div className="App">
  		<Routes>
  			{noPermissionRoutes.map((r, i) => (
					<Route key={i} path={r.path} element={r.element}/>
				))}
				{user &&
					userPermissionRoutes.map((r, i) => (
					<Route key={i} path={r.path} element={r.element}/>
				))}
				{user !== null && permissions && permissions.includes('planner') &&
					plannerPermissionRoutes.map((r, i) => (
					<Route key={i} path={r.path} element={r.element}/>
				))}
	  	</Routes>
	  		  	
    </div>
  );
}

export default App;
