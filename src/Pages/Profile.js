import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

function Profile() {
  const { userId } = useParams();
  const accessToken = useSelector((state) => state.accessToken);
  console.log(userId);
  const [state, setState] = useState({});
  useEffect(() => {
    fetch('/api/user/' + userId, {
      headers: {
        'content-type': 'application/json',
        Authorization: accessToken,
      },
    })
      .then((response) => response.json())
      .then((data) => setState(data));
  }, [userId]);
  return (
    <div className='profile'>
      <h1>{state.name}</h1>
    </div>
  );
}

export default Profile;
