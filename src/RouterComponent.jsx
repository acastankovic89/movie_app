import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GetStarted from './components/GetStarted/GetStarted';
import AdminHome from './components/AdminHome/AdminHome';
import AdminLogIn from './components/AdminLogIn/AdminLogIn';
import RegisterUser from './components/RegisterUser/RegisterUser';
import UserLogIn from './components/UserLogIn/UserLogin'
import UserPage from './components/UserPage/UserPage';
import Cookies from "js-cookie";
import PlayMovie from './components/PlayMovie/PlayMovie';

 export const RouterComponent = () => {
  const oneMovie = JSON.parse(Cookies.get("oneMovie") || "{}");
  const response = JSON.parse(Cookies.get("response") || "{}");
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GetStarted />} />
        <Route path="/adminHome" element={<AdminHome/>} />
        <Route path="/admin" element={<AdminLogIn />} />
        <Route path="/registration" element={<RegisterUser />} />
        <Route path="/userSignIn" element={<UserLogIn />} />
        <Route path="/movie" element={<PlayMovie oneMovie={oneMovie} />} />
        <Route path="/user" element={<UserPage response={response} />} />
        {/* Add more routes here for other components */}
      </Routes>
    </Router>
  );
 };

