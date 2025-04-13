import axios from 'axios';
import React, { useLayoutEffect } from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addConnections } from '../utils/connectionSlice';

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector(store => store.connections);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/connections`, {
        withCredentials: true,
      });
      dispatch(addConnections(res?.data?.data || {}));
    } catch (err) {
      console.error(err);
    }
  }

  useLayoutEffect(()=> {
    fetchConnections();
  });

  if (!connections) return;

  if (connections.length === 0) return <h1>No connections found</h1>

  return (
    <div className='flex flex-col justify-center items-center my-10'>
      <h1 className='text-bold text-2xl'>Connections</h1>
      <div className='flex flex-col text-center'>
        {connections.map(connection => {
          const {
            photoUrl='',
            firstName='',
            lastName= '',
            age='',
            gender='',
            about=''
          } = connection;
          return (
          <div
            key={`key-${connection.firstName}`}
            className='flex m-4 p-4 bg-base-200'  
          >
            <div><img className='rounded-full w-20 h-20' src={photoUrl} alt="" /></div>
            <div className='text-left mx-4'>
              <h2 className='font-bold text-xl'>{`${firstName} ${lastName}`}</h2>
              {age && gender && <p>{`${age}, ${gender}`}</p>}
              <p>{about}</p>
            </div>
          </div>
        )})}
      </div>
    </div>
  )
}

export default Connections;