import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from './components/Login/Login';
import Index from "./pages/Index"

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/chat" element={<Index />} />
      </Routes>
    </Router>
  );
}

export default App;
