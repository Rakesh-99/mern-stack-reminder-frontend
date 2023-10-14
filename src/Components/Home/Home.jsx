import React from 'react';
import Footer from '../Footer/Footer';
import NavBar from '../NavBar/NavBar';
import TypeWriter from '../TypeWriter/TypeWriter';
import { FaLaptopCode } from 'react-icons/fa';
import heroImg from '../../Assets/Meh.png';
import { Link } from 'react-router-dom';


const Home = () => {

    const getUsername = sessionStorage.getItem('username');

   
    var date = new Date();
  
    var n = date.toDateString();
  
    console.log('date', n);
    var time = date.toLocaleTimeString();
   



    return (
        <div className="">
            <NavBar />
            <div className=" bg-gray-900 h-screen flex px-10 py-5 w-full max-[760px]:flex-col max-[760px]:justify-center max-[760px]:items-center">
                <div className="flex justify-end space-x-5">
                    <span className='text-white text-2xl'>{time}</span>
                    <h1 className='text-white'>{n}</h1>

                </div>


                <div className="w-1/2 flex items-center justify-center flex-col max-[760px]:w-full">
                    {getUsername ? <h1 className='text-white font-semibold text-4xl my-2'>Hello {getUsername},</h1> : <></>}

                    <h1 className='text-white text-2xl'>Welcome to MiniReminder</h1>

                    <div className="py-10 ">
                        <TypeWriter />
                    </div>

                    <Link to={'/createreminder'} className='text-violet-700 py-2 font-semibold active:bg-violet-800 bg-white rounded-sm  px-3 '>Create Reminder</Link>

                </div>




            </div>
            <Footer />
        </div>
    );
};


export default Home;
