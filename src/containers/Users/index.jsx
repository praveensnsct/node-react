import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import Header from '../../components/Header';
import request from '../../utils/request';
import { asyncLocalStorage } from '../../utils/asyncLocalStorage';
import { setLogonDetails } from '../../redux/user/actions';

import UserTable from '../../components/User';
const { REACT_APP_API_URL } = process.env;

const User = () => {
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const data = await request(`${REACT_APP_API_URL}/users`, {
        method: 'GET',
      });
      setUsers(data);
    } catch (err) {
      console.error(err.displayMessage);
    }
  }

  const logout = async() => {
    try {
        const data = await request(`${REACT_APP_API_URL}/auth/terminate`, {
          method: 'POST',
        });
        await asyncLocalStorage.setItem('token', '');
        dispatch(setLogonDetails({}));
        dispatch(push('/'));
    } catch (err) {
        console.error(err.displayMessage);
    }
  };

  useEffect(async () => {
    getUsers();
  }, []);

  return (
    <>
        <Header isLoggedIn logout={logout}/>
        <UserTable columns={[
            { key: 'name', name: 'Full Name'},
            { key: 'status', name: 'Active/Inactive'},
        ]} data={users} />
    </>
  )
}

export default User;