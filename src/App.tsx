import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import WellnessScan from './pages/WellnessScan';
import WellnessInsights from './pages/WellnessInsights';
import WellnessHistory from './pages/WellnessHistory';

import { AudioProvider } from './context/AudioContext';

function App() {
    return (
        <AudioProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/scan" element={<WellnessScan />} />
                    <Route path="/insights" element={<WellnessInsights />} />
                    <Route path="/history" element={<WellnessHistory />} />
                    <Route path="/stats" element={<WellnessHistory />} /> {/* Fallback/Legacy */}
                </Routes>
            </Router>
        </AudioProvider>
    );
}


export default App;
