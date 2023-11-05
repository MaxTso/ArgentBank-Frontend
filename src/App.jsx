import { Routes, Route } from 'react-router-dom';
import Layout from './component/Layout/Layout';
import Home from './component/home/home.jsx';
import LoginPage from './component/login/LoginPage';
import Userdashboard from './component/dashboard/userdashboard';
import { useSelector } from 'react-redux';
import Errorpage from './component/Errorpage/Errorpage';


function App() {
  const { token } = useSelector((state) => state.Auth)

  return (
    <Layout>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sign-in' element={<LoginPage />} />
        {token ? <Route path='/user' element={<Userdashboard />} /> : null}
        <Route path='*' element={<Errorpage />} />
      </Routes>
    </Layout>
  );
}

export default App;
