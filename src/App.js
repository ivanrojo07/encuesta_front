import React, { useContext } from "react";
import {Routes, Route, Navigate} from 'react-router-dom';
import Navbar from './components/Navbar';
import { Context } from "./Context";
import Home from './pages/Home';
import Register from './pages/Register';

const App = () => {

  const { isAuth } = useContext(Context);
  console.log(isAuth);
  return (
    <div className="App">
        <Navbar />
        <Routes>
            <Route exact path="/" element={!isAuth ? <Navigate to="/register" /> : <Home />} />
            <Route exact path="/register" element={isAuth ? <Navigate to="/" /> : <Register />} />

        </Routes>
    </div>
  );
};

export default App;
