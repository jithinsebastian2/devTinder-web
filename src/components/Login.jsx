import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';
import { addUser } from '../utils/userSlice';

const Login = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailId, setEmailId] = useState('elon@gmail.com');
  const [password, setPassword] = useState('Elon@1234');
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
        const res = await axios.post(`${BASE_URL}/login`, {
            emailId,
            password,
        }, {
            withCredentials: true, // For setting the cookie for this whitelisted origin from BE
        });
        dispatch(addUser(res?.data?.data || {}));
        navigate('/');
    } catch (err) {
        setError(err?.response?.data || 'Something went wrong');
        console.error(err);
    }
  };

  const handleSignUp = async () => {
    try {
        const res = await axios.post(`${BASE_URL}/signUp`, {
            firstName, lastName, emailId,password
        }, {
            withCredentials: true,
        });
        dispatch(addUser(res?.data?.data || {}));
        navigate('/profile');
    } catch (err) {
        setError(err?.response?.data || 'Something went wrong');
    }
  };

  return (
    <div className='flex justify-center my-10'>
        <div className="card card-border bg-base-300 w-96">
            <div className="card-body">
                <h2 className="card-title justify-center">{isLoginForm ? 'Login': 'Sign Up'}</h2>
                <div>
                {!isLoginForm && 
                    <>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">First Name</legend>
                            <input
                                type="text"
                                className="input"
                                placeholder=""
                                value={firstName}
                                required
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </fieldset>
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">Last Name</legend>
                            <input
                                type="text"
                                className="input"
                                placeholder=""
                                value={lastName}
                                required
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </fieldset>
                    </>
                }
                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Email Id</legend>
                    <input
                        type="email"
                        className="input"
                        placeholder=""
                        value={emailId}
                        required
                        onChange={(e) => setEmailId(e.target.value)}
                    />
                </fieldset>
                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Password</legend>
                    <input
                        type="password"
                        className="input"
                        placeholder="Password"
                        value={password}
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </fieldset>
                </div>
                <p className='text-red-500'>{error}</p>
                <div className="card-actions justify-center py-5">
                    <button
                        className="btn btn-primary"
                        onClick={isLoginForm ? handleLogin : handleSignUp}
                    >
                        {isLoginForm ? 'Login' : 'Sign Up'}
                    </button>
                </div>
                <p
                    className='text-500 text-center cursor-pointer'
                    onClick={()=> setIsLoginForm((value) => !value)}
                >
                    {isLoginForm ? 'New User? SignUp here' : 'Existing User? Login here'}
                </p>
            </div>
        </div>
    </div>
  )
}

export default Login