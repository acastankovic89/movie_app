import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GetStarted from './components/GetStarted/GetStarted';
import Home from './components/Home';

 export const RouterComponent = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GetStarted />} />
        <Route path="/home" element={<Home />} />
        {/* Add more routes here for other components */}
      </Routes>
    </Router>
  );
 };

