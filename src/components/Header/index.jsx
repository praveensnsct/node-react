import React from 'react';
import './index.scss';

const Header = ({ isLoggedIn, logout }) => {
  return (
      <header className='header'>
          <h1>Welcome!!!</h1>
          {isLoggedIn ? <input type='button' className='logout' value='Log Out' className='logout' onClick={logout}/> : <></>}
      </header>
  )
}

export default Header;