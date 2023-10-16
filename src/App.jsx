import React from 'react';
import Signup from './Components/Signup/Signup';
import Login from './Components/Login/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './Components/Home/Home';
import OtpVerify from './Components/otpVerify/OtpVerify';
import CreateReminder from './Components/CreateReminder/CreateReminder';
import ViewReminders from './Components/ViewReminders/ViewReminders';
import EditReminder from './Components/EditReminder/EditReminder';






const App = () => {

    const accessToken = sessionStorage.getItem('accessToken');
    const refreshToken = sessionStorage.getItem('refreshToken');
    const userrole = sessionStorage.getItem('userrole');


    return (
        <>
            <ToastContainer />
            <Router>
                <Routes>
                    <Route path='/viewreminders' element={<ViewReminders />} />
                    <Route path='/editreminders/:id' element={<EditReminder />} />
                    <Route path='/createreminder' element={<CreateReminder />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/signup' element={<Signup />} />
                    <Route path='/' element={<Home />} />
                    <Route path='/otpVerify' element={<OtpVerify />} />
                </Routes>
            </Router>
        </>
    )
}

export default App