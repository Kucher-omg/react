import React from 'react';

import classes from './FriendsItem.module.css';

const FriendsItem = (props) => {

    return(
        <div>
            <div className={classes.person}>
                <div className={classes.photo}>
                    <img src="https://www.pinclipart.com/picdir/middle/165-1653686_female-user-icon-png-download-user-colorful-icon.png" alt=""/>
                </div>
                <div className={classes.person_name}>
                    {props.name}
                </div>
            </div>
        </div>
    );
}

export default FriendsItem;