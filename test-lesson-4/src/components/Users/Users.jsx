import React from 'react';
import styles from './users.module.css';

let Users = (props) => {

    if (props.usersData.lenght === 0) {
        props.SetUsersAC([
            { id: 1, photoUrl: 'https://cdn.jpegmini.com/user/images/slider_puffin_before_mobile.jpg', FullName: 'Vlad', status: 'I`m boss', location: { city: 'Kiev', country: 'Ukraine' }, followed: true },
            { id: 2, photoUrl: 'https://cdn.jpegmini.com/user/images/slider_puffin_before_mobile.jpg', FullName: 'Denis', status: 'I`m boss', location: { city: 'Kiev', country: 'Ukraine' }, followed: true },
            { id: 3, photoUrl: 'https://cdn.jpegmini.com/user/images/slider_puffin_before_mobile.jpg', FullName: 'Diana', status: 'I`m noirkoyara', location: { city: 'Kiev', country: 'Ukraine' }, followed: false }
        ]);
    }

    return (
        <div>
            {props.usersData.map(u => <div className={styles.main} key={u.id}>
                <div >
                    <div className={styles.info}>
                        <div>
                            <img className={styles.photo} src={u.photoUrl} />
                            <span>
                                <span className={styles.name}>{u.FullName}</span>
                                <span className={styles.status}>{u.status}</span>
                                <span className={styles.country}>
                                    {u.location.city}
                                    <br />
                                    {u.location.country}
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