import React from 'react';

import classes from './FriendsItem.module.css';

const FriendsItem = (props) => {

    return(
        <div>
            <div className={classes.person}>
                <div className={classes.photo}>
                    
                </div>
                <div className={classes.person_name}>
                    {props.name}
                </div>
            </div>
        </div>
    );
}

export default FriendsItem;