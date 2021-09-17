import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { Redirect } from 'react-router';

import request from '../../utils/request';
import CreateUserForm from '../../components/CreateUser';

const { REACT_APP_API_URL } = process.env;

const CreateUser = () => {
  const dispatch = useDispatch();
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState(false);

  const checkError = (val) => {
    if (val) {
      setError(false);
    } else {
      setError('All fileds are mandatory');
    }
  };

  const updateUserId = (evt) => {
    setUserId(evt.target.value);
    checkError(evt.target.value);
  };

  const updatePassword = (evt) => {
    setPassword(evt.target.value);
    checkError(evt.target.value);
  };

  const updateFullName = (evt) => {
    setFullName(evt.target.value);
    checkError(evt.target.value);
  };

  const createUser = async () => {
    try {
      setError(false);
      if (!userId || !password || !fullName) {
        setError('All fields are mandatory');
        return;
      }
      const data = await request(`${REACT_APP_API_URL}/users`, {
        method: 'POST',
        body: JSON.stringify({
          email: userId,
          password,
          name: fullName
        })
      });
      dispatch(push('/login'));
    } catch (err) {
      setError('User creation failed. Email already exists.');
    }
  }

  const signIn = () => {
    dispatch(push('/login'));
  }

  return (
    <>
      <CreateUserForm
        onSubmit={createUser}
        signIn={signIn}
        setUserId={updateUserId}
        setPassword={updatePassword}
        setFullName={updateFullName}
        error={error}/>
    </>
  )
}

export default CreateUser;