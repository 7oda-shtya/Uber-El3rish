import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Sign from './pages/Sign';
import ClientSignIn from './pages/client/ClientSignIn';
import ClientSignUp from './pages/client/ClientSignUp';
import DriverSignIn from './pages/driver/DriverSignIn';
import DriverSignUp from './pages/driver/DriverSignUp';
import ClientHome from './pages/client/ClientHome';
import ClientProfile from './pages/client/ClientProfile';
import Favorites from './pages/client/ClientFavorites';
import History from './pages/client/ClientHistory';
import RequestTrip from './pages/client/RequestTrip';
import EditProfile from './pages/client/ClientEditProfile';
import 'leaflet/dist/leaflet.css';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  return (
    <div className='main-app min-h-screen w-full bg-client-app text-white relative'>
      <ScrollToTop />
      <Routes>
        <Route path='/' element={<ClientHome />} />
        <Route path='/profile' element={<ClientProfile />} />
        <Route path='/profile/edit' element={<EditProfile />} />
        <Route path='/request-trip' element={<RequestTrip />} />
        <Route path='/bookmarks' element={<Favorites />} />
        <Route path='/history' element={<History />} />
        <Route path='/sign' element={<Sign />} />
        <Route path='/client/sign-in' element={<ClientSignIn />} />
        <Route path='/client/sign-up' element={<ClientSignUp />} />
        <Route path='/driver/sign-in' element={<DriverSignIn />} />
        <Route path='/driver/sign-up' element={<DriverSignUp />} />
      </Routes>
    </div>
  );
}

export default App;
