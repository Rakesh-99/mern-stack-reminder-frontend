import axios from 'axios';
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';



const OtpVerify = () => {

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const location = useLocation();

    const [otp, setOtp] = useState('');

    const otpHandle = () => {
        if (otp.length !== 0) {
            otpVerify();
        } else {
            toast.error('Please enter the valid OTP');
        }
    };

    const changeOtpHandle = (e) => {
        setOtp(e.target.value);
    };

    const otpVerify = () => {

        const email = location.state.email; // Get email from location state

        // Make the API call to verify the OTP
        setLoading(true);
        axios
            .post(' https://reminder-backend-8ll6.onrender.com/otpverify', { email, emailToken: otp })
            .then((res) => {
                console.log(res.data);
                if (res.status === 200) {
                    setLoading(false);
                    toast.success('You have been verified');

                    setTimeout(() => {
                        navigate('/login');
                    }, 1000);

                } else if (res.status === 400 || res.status === 404) {
                    setLoading(false);
                    toast.error('Invalid otp');
                }

            })
            .catch((err) => {
                setLoading(false);
                console.log(err);
            });

    };

    return (
        <>
            <div className="w-full h-screen bg-slate-200 flex flex-col justify-center items-center space-y-3">
                <input
                    type="text"
                    placeholder="Enter OTP"
                    className="px-2 w-72 py-1 outline-none rounded-sm font-semibold text-gray-400 text-xl text-center"
                    value={otp}
                    onChange={changeOtpHandle}
                    name="otp"
                />

                <button
                    className="bg-blue-700 text-white font-semibold w-32 py-1 transition-all rounded-md px-3 active:bg-blue-400 "
                    onClick={otpHandle}
                >
                    {loading === true ? <p className='font-semibold transition-all'>Verifying user</p> : <p>Submit</p>}
                </button>
            </div>
        </>
    );
};

export default OtpVerify;