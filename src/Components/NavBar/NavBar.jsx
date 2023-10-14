
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {



    const navigate = useNavigate();

    const accessToken = sessionStorage.getItem('accessToken');
    const userrole = sessionStorage.getItem('userrole');





    const userLogout = () => {

        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('refreshToken');
        sessionStorage.removeItem('userrole');
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('email');
        alert('You have been logged out successfully')
        navigate('/blog');
    }




    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="bg-gradient-to-r from-blue-900 to-violet-800 p-3 sticky top-0 left-0 transition-all">
            <div className="flex items-center justify-between transition-all ">

                <div className="flex items-center">
                    <Link to={'/'} className="text-white text-lg font-semibold">Reminder</Link>
                </div>

                <div className="hidden md:flex space-x-32 items-center">

                    <li className='list-none text-white cursor-pointer hover:text-gray-300 hover:border-b-2 border-indigo-400'><Link to={'/'}>Home</Link></li>

                    <li className='list-none text-white cursor-pointer hover:text-gray-300 hover:border-b-2 border-indigo-400'><Link to={'/viewreminders'}>View Reminders</Link></li>

                    <li className='list-none text-white cursor-pointer hover:border-b-2 border-indigo-400 hover:text-gray-300 '><Link to={'/about'}>About</Link></li>


                    <div className="flex space-x-2">
                        {
                            accessToken && <li className='list-none text-white cursor-pointer hover:text-gray-300 bg-red-700 rounded-sm py-1 px-2'><span onClick={userLogout}>Logout</span></li>
                        }
                        {
                            !accessToken && <li className='list-none text-white cursor-pointer hover:text-gray-300  active:bg-green-900 font-semibold rounded-sm py-1 bg-gray-900 px-5'><Link to={'/login'}>Login</Link ></li>
                        }

                    </div>


                </div>

                <div className="md:hidden transition-all">
                    <button
                        className="text-white transition-all focus:outline-none"
                        onClick={toggleMenu}
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            {isMenuOpen ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                ></path>
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16m-7 6h7"
                                ></path>
                            )}
                        </svg>
                    </button>
                </div>
            </div>
            {
                //  NavBar for smaller devices : 

                isMenuOpen && (
                    <div className="md:hidden mt-16  mx-10 space-y-8 transition-all">

                        <li className='list-none text-white cursor-pointer hover:text-gray-300'><Link to={'/'}>Home</Link></li>


                        <li className='list-none text-white cursor-pointer hover:text-gray-300'><Link to={'/about'}>About</Link></li>
                        {
                            accessToken && <li className='list-none text-white cursor-pointer hover:text-gray-300'><span onClick={userLogout} className='bg-red-700 px-1 py-1 rounded-sm'>Logout</span></li>
                        }
                        {
                            !accessToken &&
                            <div className='flex'>
                                <li className='list-none text-white cursor-pointer hover:text-gray-300'><Link to={'/login'} className=' text-sm rounded-sm'>Login</Link ></li>

                                {/* <li className='list-none text-white cursor-pointer hover:text-gray-300'><Link to={'/signup'} className='bg-red-700 text-sm px-5 py-2 rounded-sm' >Signup</Link ></li> */}
                            </div>
                        }

                    </div>
                )
            }
        </nav >
    );
};

export default Navbar;
