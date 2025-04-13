import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';
import axios from 'axios';
import { removeUser } from '../utils/userSlice';
import { removeFeed } from '../utils/feedSlice';
import { emptyRequests } from '../utils/requestSlice';
import { removeConnections } from '../utils/connectionSlice';

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store?.user);
  const { photoUrl = null, firstName = '' } = user || {};

  const handleLogout = async() => {
    try {
      await axios.post(`${BASE_URL}/logout`, {}, {
        withCredentials: true,
      });
      dispatch(removeUser());
      dispatch(removeFeed());
      dispatch(emptyRequests());
      dispatch(removeConnections());
      navigate('/login');
    } catch (err) {
      console.error(err);
      //Error logic: re-direct to error page
    }
  };

  return (
    <div className="navbar bg-base-200 shadow-sm">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">🧑🏻‍💻 DevTinder</Link>
      </div>
      {user && <div className="flex gap-2">
        {/* <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" /> */}
        <div className='form-control flex items-center'>Welcome, {firstName}</div>
       <div className="dropdown dropdown-end mx-5">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img
                alt="user photo"
                src={photoUrl} />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-info-content rounded-box z-1 mt-3 w-52 p-2 shadow">
            <li>
              <Link to="/profile" className="justify-between">
                Profile
                {/* <span className="badge">New</span> */}
              </Link>
            </li>
            <li>
              <Link
                to='/connections'
              >
              Connections</Link>
            </li>
            <li>
              <Link
                to='/requests'
              >
              Requests</Link>
            </li>
            <li><a onClick={handleLogout}>Logout</a></li>
          </ul>
        </div>
      </div>}
    </div>
  )
};

export default NavBar;
