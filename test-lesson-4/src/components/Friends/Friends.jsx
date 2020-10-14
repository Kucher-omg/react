import React from 'react';

import classes from './Friends.module.css';
import FriendsItem from './FriendsItem/FriendsItem';

const Friends = (props) => {

    let friend = props.friend.map(friend => <FriendsItem name={friend.name} />);

    return(
        <div>
            <div className={classes.friends_title}>
                My friends
            </div>
            {friend}
        </div>
    );
}

export default Friends;