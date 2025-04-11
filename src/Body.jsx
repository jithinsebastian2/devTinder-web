import React from 'react'
import { Outlet } from 'react-router-dom';
// import PropTypes from 'prop-types'
import NavBar from './NavBar'
import Footer from './Footer';
import Login from './Login';
import Profile from './Profile';

const  Body = () => {
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
