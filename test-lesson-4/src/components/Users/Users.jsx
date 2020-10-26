import * as axios from 'axios';
import React from 'react';
import styles from './users.module.css';
// const axios = require('axios');


let Users = (props) => {

    let getUsers = () => {
        if (props.usersData.length === 0) {
            
            axios.get('https://social-network.samuraijs.com/api/1.0/users')
            .then(response => {
                props.SetUsers(response.data.items);
            });
        }
    }


    return (
        <div>
            <button onClick={getUsers}>Get users</button>
            {props.usersData.map(u => <div className={styles.main} key={u.id}>
                <div >
                    <div className={styles.info}>
                        <div>
                            <img className={styles.photo} src={u.photos.small != null ? u.photoUrl.small : 'https://cdn.jpegmini.com/user/images/slider_puffin_before_mobile.jpg'} />
                            <span>
                                <span className={styles.name}>{u.name}</span>
                                <span className={styles.status}>{u.status}</span>
                                <span className={styles.country}>
                                    {/* {u.location.city}
                                    <br />
                                    {u.location.country} */}
                                </span>
                            </span>

                        </div>
                        <div>
                            {u.followed
                                ? <button onClick={() => { props.unfollow(u.id) }}>Unfollow</button>
                                : <button onClick={() => { props.follow(u.id) }}>Follow</button>}
                            {/* <button>Follow</button> */}
                        </div>
                    </div>

                </div>
            </div>)}
        </div>
    );
}

export default Users;