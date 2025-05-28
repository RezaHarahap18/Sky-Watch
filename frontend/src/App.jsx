import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PollutionPage from './pages/pollution-page';
import InformationPage from './pages/information-page';
import Navbar from './components/navbar';
import SkyWatch from './pages/home-page';

function App() {
  return (
    <Router>
        <Navbar />
      <Routes>
        <Route path="/" element={<SkyWatch />} />
        <Route path="/pollution" element={<PollutionPage />} />
        <Route path="/information" element={<InformationPage />} />
      </Routes>
    </Router>
  );
}

export default App;
