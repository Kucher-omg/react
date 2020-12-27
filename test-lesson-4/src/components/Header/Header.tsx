import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Header.module.css';

type PropsType = {
  isAuth: boolean,
  login: string
}

const Header: React.FC<PropsType> = (props) => {
  return (
    <header className={classes.header}>
      <img src="https://turbologo.com/articles/wp-content/uploads/2019/08/facebook-old-logo-.png"></img>
      
      <div className={classes.loginBlock}>
        {props.isAuth
          ? <NavLink to='/login'>
            {props.login}
          </NavLink>
            : <NavLink to='/login'>
          Login
            </NavLink>}
          </div>
    </header>
  );
}

export default Header;