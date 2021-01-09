import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { AppStateType } from '../../Redux/Redux-store';
import classes from './Header.module.css';

type PropsType = {
  
}
 
export const Header: React.FC<PropsType> = (props) => {
  const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)
  const login = useSelector((state: AppStateType) => state.auth.login)

  return (
    <header className={classes.header}>
      <img src="https://turbologo.com/articles/wp-content/uploads/2019/08/facebook-old-logo-.png"></img>
      
      <div className={classes.loginBlock}>
        {isAuth
          ? <NavLink to='/login'>
            {login}
          </NavLink>
            : <NavLink to='/login'>
          Login
            </NavLink>}
          </div>
    </header>
  );
}
