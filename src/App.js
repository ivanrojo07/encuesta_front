import React from "react";
import {Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Register from './pages/Register';

const App = () => {
  return (
    <div className="App">
        <Navbar />
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/register" element={<Register />} />
        </Routes>
    </div>
  );
};

export default App;
