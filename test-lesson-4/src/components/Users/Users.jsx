import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './users.module.css';

let Users = (props) => {
    
    let pageCount = Math.ceil( props.totalUsersCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pageCount; i++){
        pages.push(i);
    }
    return (
        <div>
            <div>
                {pages.map(p => {
                    return <span
                        className={props.currentPage === p
                            && styles.selectedPage}
                        onClick={(e) => { props.onPageChanged(p); }}>{p}</span>
                })}
            </div>
            {props.usersData.map(u => <div className={styles.main} key={u.id}>
                <div >
                    <div className={styles.info}>
                        <div>
                            <NavLink to={`/profile/${u.id}`}>
                                <img className={styles.photo}
                                    src={u.photos.small != null
                                        ? u.photos.small
                                        : 'https://cdn.jpegmini.com/user/images/slider_puffin_before_mobile.jpg'} />
                            </NavLink>
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