import React from 'react';
import logo from '../../images/techfides.svg';
import '../css/menu.css';
function Menu() {
  return (
    <nav className='navigationbar'>
      <img src={logo} className='navigationbar__logo' alt='Techfides Logo' />
    </nav>
  );
}

export default Menu;
