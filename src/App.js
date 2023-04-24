import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
// import Home from './screens/Home';
import './App.css';
import logo from './logo.svg';
import Camera from './screens/Camera';
import Collection from './screens/Collection';

function App() {
  return (
    <div className="App">
      {/* <Camera /> */}
      <Router>
        <Routes>
          <Route path="/alive-frontend" element={<Camera />} />
          <Route path="/collection" element={<Collection />} />
        </Routes>
      </Router>
    </div>

  );
}

export default App;
