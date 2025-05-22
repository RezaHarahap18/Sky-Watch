import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/home-page';
import PollutionPage from './pages/pollution-page';
import InformationPage from './pages/information-page';
import Navbar from './components/navbar';

function App() {
  return (
    <Router>
        <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pollution" element={<PollutionPage />} />
        <Route path="/information" element={<InformationPage />} />
      </Routes>
    </Router>
  );
}

export default App;
