import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { Redirect } from 'react-router';

import request from '../../utils/request';
import LoginForm from '../../components/Login';
import { asyncLocalStorage } from '../../utils/asyncLocalStorage';
import { setLogonDetails } from '../../redux/user/actions';

const { REACT_APP_API_URL } = process.env;

const Login = () => {
  const dispatch = useDispatch();
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const token = asyncLocalStorage.getItem('token');

  const updateUserId = (evt) => {
    setUserId(evt.target.value);
  };

  const updatePassword = (evt) => {
    setPassword(evt.target.value);
  };

  const signIn = async () => {
    try {
      setError(false);
      const data = await request(`${REACT_APP_API_URL}/auth`, {
        method: 'POST',
        body: JSON.stringify({
          userId,
          password
        })
      });
      await asyncLocalStorage.setItem('token', data.token);
      dispatch(setLogonDetails(data));
      dispatch(push('/users'));
    } catch (err) {
      setError(err && err.displayMessage);
    }
  }

  return (
    <>
      { token ? <Redirect to="/users" /> : <LoginForm onSubmit={signIn} setUserId={updateUserId} setPassword={updatePassword} error={error}/> }
    </>
  )
}

export default Login;