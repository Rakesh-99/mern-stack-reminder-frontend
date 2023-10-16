import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import Navbar from '../NavBar/NavBar';
import Spinner from '../Spinner/Spinner'

const Login = () => {

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()

  const initialState = {
    username: '',
    email: '',
    password: ''
  }

  const [loginInfo, setLoginInfo] = useState(initialState)

  const inputChangeHandle = e => {
    const { name, value } = e.target
    setLoginInfo({ ...loginInfo, [name]: value })
  }

  const login = e => {
    e.preventDefault()
    validateSignupUser(loginInfo)
  }

  const validateSignupUser = values => {
    const regEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

    if (!values.email) {
      toast.error('Email is required')
      return false
    } else if (!regEx.test(values.email)) {
      toast.error('Enter a valid email')
      return false
    }

    if (!values.password) {
      toast.error('Password is empty')
      return false
    } else if (values.password.length < 6) {
      toast.error('Password required minimum 6 char')
      return false
    } else {

      setLoading(true);
      axios
        .post('https://reminder-backend-8ll6.onrender.com/login', loginInfo)
        .then(res => {
          if (res.status === 200) {
            setLoading(false);

            sessionStorage.setItem(
              'accessToken',
              `Bearer ${res.data.myAccessToken}`
            )
            sessionStorage.setItem(
              'refreshToken',
              `Bearer ${res.data.myRefreshToken}`
            )
            sessionStorage.setItem('userrole', `Bearer ${res.data.userrole}`)

            sessionStorage.setItem('username', res.data.username);
            sessionStorage.setItem('email', res.data.email)
            navigate('/');
          }
        })
        .catch(err => {
          setLoading(false);
          toast.error(err.response.data.res);
        })
    }
  }

  return (



    <div className='flex flex-col w-full justify-center items-center h-screen'>

      <form
        action=''
        className='flex flex-col w-[400px] border rounded-md px-5 py-5'
      >
        <div className='titile'>
          <h1 className='text-3xl  font-semibold mb-5'>Login</h1>
        </div>

        <div className='flex flex-col'>
          <label htmlFor='' className='font-semibold text-sm'>
            Email
          </label>
          <input
            type='text'
            placeholder='Email'
            className='border outline-none  py-2 px-2 rounded-sm'
            autoComplete='off'
            onChange={inputChangeHandle}
            name='email'
            value={loginInfo.email}
          />
        </div>

        <div className='flex flex-col mt-3'>
          <label htmlFor='' className='font-semibold text-sm'>
            Password
          </label>
          <input
            type='password'
            placeholder='Password'
            className='border text-green-400  outline-none py-2 px-1 rounded-sm '
            onChange={inputChangeHandle}
            name='password'
            value={loginInfo.password}
          />
        </div>

        <button
          className='bg-green-700 text-white py-2  mt-5  rounded-md shadow-xl shadow-green-300 font-semibold active:bg-blue-900'
          onClick={login}
        >
          {loading === true ? <p>Please wait... <Spinner /> </p> : <p>Login</p>}
        </button>
        <div className='flex justify-center mt-5'>
          <Link
            to={'/signup'}
            className=' font-lg text-base active:text-green-900'
          >
            <span>Dont have an account ? </span>
            <span className='text-blue-700 hover:underline'>Create one</span>
          </Link>
        </div>
      </form>
    </div>
  )
}

export default Login;
