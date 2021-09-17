import React from 'react';
import Header from '../Header';
import './index.scss';

const CreateUser = ({ onSubmit, signIn, setUserId, setPassword, setFullName, error }) => {
  return (
    <div className='userContainer'>
        <Header />
        <div className='userContainer_body'>
            <div className='userContainer_body_content'>
                {
                    error ? <p className='userContainer_body_error'>{error}</p> : null
                }
                <p>Create Account</p>
                <div className='formInput'>
                    <label for="fullName">Full Name*</label>
                    <input type="text" name="userId" id="userId" className='formInput_input' onChange={setFullName} autoComplete="off"/>
                </div>
                <div className='formInput'>
                    <label for="userId">Email*</label>
                    <input type="text" name="userId" id="userId" className='formInput_input' onChange={setUserId} autoComplete="off"/>
                </div>
                <div className='formInput'>
                    <label for="password">Password*</label> 
                    <input type="password" name="password" id="password" className='formInput_input' onChange={setPassword} autoComplete="off"/>
                </div>
                <input type='submit' onClick={onSubmit} className='formInput_submit' value='Create Account' disabled={error ? true : false}/>
                <input type='submit' onClick={signIn} className='formInput_submit' value='Sign In'/>
            </div>
        </div>
    </div>
  )
}

export default CreateUser;