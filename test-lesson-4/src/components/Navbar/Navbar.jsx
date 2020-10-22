import React from 'react';
import { NavLink } from 'react-router-dom';
import Friends from '../Friends/Friends';
import classes from './Navbar.module.css';


const Navbar = (props) => {
  let state = props.store.getState().sidebar;
  return (

    <nav className={classes.nav}>
      <div className={classes.item}>
        <NavLink to="/profile" activeClassName={classes.active}>
          Profile
        </NavLink>
      </div>
      <div className={classes.item}>
        <NavLink to="/dialogs" activeClassName={classes.active}>
          Messages
        </NavLink>
      </div>
      <div className={classes.item}>
        <a>
          News
        </a>
      </div>
      <div className={classes.item}>
        <a>
          Music
        </a>
      </div>
      <div className={classes.item}>
        <a>
          Settings
        </a>
      </div>
      <div className={classes.item}>
        <NavLink to="/users" activeClassName={classes.active}>
          Users
        </NavLink>
      </div>
      <div>
        <Friends friend={state.sidebarData} />
      </div>
    </nav>
  );
}

export default Navbar;