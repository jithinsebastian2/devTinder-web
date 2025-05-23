import axios from 'axios'
import React, { useLayoutEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/feedSlice'
import UserCard from './UserCard';

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector(store => store.feed);

  const getFeed = async() => {
    try {
      const res = await axios.get(`${BASE_URL}/feed`, {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.data || []));
    } catch (err) {
      console.error(err);
    }
  }

  useLayoutEffect(() => {
    getFeed();
  }, []);

  if (!feed) return;

  if (feed.length === 0) return <h2 className='flex justify-center mt-10'>No new users found</h2>

  return (
    feed && <div className='flex justify-center my-10'>
      <UserCard {...{
        flow: 'feed',
        user: feed[0] || {},
      }}/>
    </div>
  );
}

export default Feed;