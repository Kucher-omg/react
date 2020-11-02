import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './users.module.css';
import * as axios from 'axios';

let Users = (props) => {

    let pageCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pageCount; i++) {
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
                                ? <button onClick={() => {
                                    axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {
                                        withCredentials: true,
                                        headers: {
                                            "API-KEY" : 'ebd28442-c10f-47c7-b19b-27d6fc3e2b96'
                                        }
                                      })
                                        .then(response => {
                                            if (response.data.resultCode === 0){
                                                // this.props.toggleIsFetching(false);
                                                // this.props.SetUsers(response.data.items);
                                                props.unfollow(u.id);
                                            }
                                    
                                        });
                                    

                                }}>Unfollow</button>
                                : <button onClick={() => {

                                    axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {}, {
                                        withCredentials: true,
                                         headers: {
                                             "API-KEY" : 'ebd28442-c10f-47c7-b19b-27d6fc3e2b96'
                                            }
                                      })
                                        .then(response => {
                                            if (response.data.resultCode === 0){
                                                // this.props.toggleIsFetching(false);
                                                // this.props.SetUsers(response.data.items);
                                                props.follow(u.id);
                                            }
                                          
                                        });
                                    

                                }}>Follow</button>}
                        </div>
                    </div>

                </div>
            </div>)}
        </div>
    );
}

export default Users;