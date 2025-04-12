import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';
import { addUser } from '../utils/userSlice';

const Login = () => {
  const [emailId, setEmailId] = useState('jithin@gmail.com');
  const [password, setPassword] = useState('Jithin@1234');

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
        console.error(err);
    }
  };

  return (
    <div className='flex justify-center my-10'>
        <div className="card card-border bg-base-300 w-96">
            <div className="card-body">
                <h2 className="card-title justify-center">Login</h2>
                <div>
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
                <div className="card-actions justify-center py-5">
                    <button className="btn btn-primary" onClick={handleLogin}>Login</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login