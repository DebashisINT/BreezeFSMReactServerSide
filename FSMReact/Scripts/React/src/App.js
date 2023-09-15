import React from 'react';
import ReactDOM from 'react-dom/client';
import Login from './Components/Login/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
    return (
        <div className="App">
            <ToastContainer theme='colored' position='top-center'></ToastContainer>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Login />} />
                </Routes>
            </BrowserRouter>

        </div>
    );
}
export default App; 