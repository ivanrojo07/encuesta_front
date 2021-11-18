import React from "react";
import {Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Register from './pages/Register';

const App = () => {
  return (
    <div>
        <Navbar />
        <Routes>
            <Route exact path="/" component={Home}/>
            <Route exact path="/register" component={Register}/>
        </Routes>
    </div>
  );
};

export default App;
