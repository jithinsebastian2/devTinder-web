import React, { useLayoutEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
// import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux';
import NavBar from './NavBar'
import Footer from './Footer';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { addUser } from '../utils/userSlice';

const  Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store)=> store.user);

  const fetchUser = async () => {
    try {
      const user = await axios.get(`${BASE_URL}/profile/view`, {
        withCredentials: true,
      });
      dispatch(addUser(user?.data || {}));
    } catch (err) {
      if (err.status === 401) {
        navigate('/login');
      } else {
        console.error(err);
      }
    }
  };

  useLayoutEffect(() => {
    if (!userData) {
      fetchUser();
    }
  }, []);

  return (
    <div>
        <NavBar />
        <Outlet /> {/* Any children routes of body will render over here */}   
        <Footer /> 
    </div>
  )
}

// Body.propTypes = {}

export default Body
