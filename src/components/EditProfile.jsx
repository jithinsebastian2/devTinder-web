import React, { useState } from 'react'
import UserCard from './UserCard';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const EditProfile = ({ user }) => {
  const dispatch = useDispatch();

  const [profileFields, setProfileFields] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    photoUrl: user.photoUrl,
    age: user.age,
    gender: user.gender,
    about: user.about,
  });
  const [error, setError] = useState('');
  const [showToast, setShowToast] = useState('');

  const handleEditField = (field = '', value = '') => {
    setProfileFields((prev)=> ({
        ...prev, 
        [field]: value
    }));
  };

  const {
    firstName=  '',
    lastName = '',
    photoUrl = '',
    age = '',
    gender = '',
    about = '',
  } = profileFields;

  const handleSaveProfile = async() => {
    try {
        const res = await axios.patch(`${BASE_URL}/profile/edit`, profileFields, {
            withCredentials: true,
        });
        if (error) {
            setError('');
        }
        dispatch(addUser(res?.data?.data || {}));
        setShowToast(true);
        setTimeout(()=> {
            setShowToast(false);
        }, 3000);
    } catch (err) {
        setError(err?.response?.data || 'Something went wrong');
    }
  };
    
  return (
    <div className='flex justify-center pt-10'>
        <div className='flex justify-center mr-10'>
            <div className="card card-border bg-base-300 w-96">
                <div className="card-body">
                    <h2 className="card-title justify-center">Edit Profile</h2>
                    <div>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">First Name</legend>
                        <input
                            type="text"
                            className="input"
                            placeholder=""
                            value={firstName}
                            required
                            onChange={(e) => handleEditField('firstName', e.target.value)}
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
                            onChange={(e) => handleEditField('lastName', e.target.value)}
                        />
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Photo URL</legend>
                        <input
                            type="text"
                            className="input"
                            placeholder=""
                            value={photoUrl}
                            required
                            onChange={(e) => handleEditField('photoUrl', e.target.value)}
                        />
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Age</legend>
                        <input
                            type="text"
                            className="input"
                            placeholder=""
                            value={age}
                            required
                            onChange={(e) => handleEditField('age', e.target.value)}
                        />
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Gender</legend>
                        <div className="dropdown dropdown-bottom dropdown-end">
                            <div tabIndex={0} role="button" className="btn m-1">{gender}</div>
                            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                                <li  onClick={() => handleEditField('gender', 'male')}><a>Male</a></li>
                                <li  onClick={() => handleEditField('gender', 'female')}><a>Female</a></li>
                            </ul>
                        </div>
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">About</legend>
                        <textarea
                            className="textarea h-24"
                            placeholder=""
                            value={about}
                            onChange={(e) => handleEditField('about', e.target.value)}
                        >
                        </textarea>
                    </fieldset>
                    </div>
                    <p className='text-red-500'>{error}</p>
                    {/* <p className='text-red-500'>{error}</p> */}
                    <div className="card-actions justify-center py-5">
                        <button className="btn btn-primary" onClick={handleSaveProfile}>Save Profile</button>
                    </div>
                </div>
            </div>
        </div>
        <UserCard {...{flow: 'profile', user: profileFields}} />
        <div className="toast toast-top toast-center">
        {showToast && <div className="alert alert-success">
            <span>Profile Saved successfully.</span>
        </div>}
        </div>
    </div>
  )
}

export default EditProfile