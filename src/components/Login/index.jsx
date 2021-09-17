import React from 'react';
import Header from '../Header';
import './index.scss';

const LoginForm = ({ onSubmit, onSignUp, setUserId, setPassword, error }) => {
  return (
    <div className='loginContainer'>
        <Header />
        <div className='loginContainer_body'>
            <div className='loginContainer_body_content'>
                {
                    error ? <p className='loginContainer_body_error'>{error}</p> : null
                }
                <p>Sign In</p>
                <div className='formInput'>
                    <label for="userId">Email</label>
                    <input type="text" name="userId" id="userId" className='formInput_input' onChange={setUserId}/>
                </div>
                <div className='formInput'>
                    <label for="password">Password</label> 
                    <input type="password" name="password" id="password" className='formInput_input' onChange={setPassword}/>
                </div>
                <input type='submit' onClick={onSubmit} className='formInput_submit' value='Sign In' />
                <input type='submit' onClick={onSignUp} className='formInput_submit' value='Sign Up' />
            </div>
        </div>
    </div>
  )
}

export default LoginForm;