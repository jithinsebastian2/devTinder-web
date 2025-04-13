/* eslint-disable react-hooks/exhaustive-deps -- disabled */
import axios from 'axios';
import React, { useLayoutEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '../utils/constants';
import { addRequest, removeRequest } from '../utils/requestSlice';

const Requests = () => {
    const dispatch = useDispatch();
    const requests = useSelector(store => store.requests);
  
    const fetchRequests = async() => {
      try {
        const res = await axios.get(`${BASE_URL}/user/requests/received`, {
          withCredentials: true,
        });
        dispatch(addRequest(res?.data?.data || []));
      } catch (err) {
        console.error(err);
      }
    }
  
    useLayoutEffect(() => {
        fetchRequests();
    }, []);

    const handleReviewRequest = async (status = '', _id = '') => {
        try {
            await axios.post(`${BASE_URL}/request/review/${status}/${_id}`, {}, {
                withCredentials: true,
            });
            dispatch(removeRequest(_id));
        } catch (err) {
            console.error(err);
        }
    };

    if (!requests) return;

    if (requests.length === 0) return <h1 className='flex justify-center mt-10'>No requests found</h1>

    return (
        <div className='flex flex-col justify-center items-center my-10'>
      <h1 className='text-bold text-2xl'>Connection Requests</h1>
      <div className='flex flex-col text-center'>
        {requests.map(request => {
          const {
            _id='',
            photoUrl='',
            firstName='',
            lastName= '',
            age='',
            gender='',
            about=''
          } = request?.fromUserId || {};
          return (
          <div
            key={`key-${_id}`}
            className='flex items-center m-4 p-4 bg-base-200'  
          >
            <div><img className='rounded-full w-20 h-20' src={photoUrl} alt="" /></div>
            <div className='text-left mx-4'>
              <h2 className='font-bold text-xl'>{`${firstName} ${lastName}`}</h2>
              {age && gender && <p>{`${age}, ${gender}`}</p>}
              <p>{about}</p>
            </div>
            <div className=''>
                <button
                    className="btn btn-secondary"
                    onClick={()=> handleReviewRequest('rejected', request._id)}
                >Reject</button>
                <button
                    className="btn btn-accent ml-2"
                    onClick={()=> handleReviewRequest('accepted', request._id)}
                >Accept</button>
            </div>
          </div>
        )})}
      </div>
    </div>
    );
}

export default Requests;