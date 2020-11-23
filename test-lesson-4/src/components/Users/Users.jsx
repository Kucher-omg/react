import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './users.module.css';
import { unfollowThunkCreator, followThunkCreator } from '../../Redux/users-reducer';
import Pagination from './../common/pagination/pagination';


let Users = (props) => {

    return (
        <div>
            <Pagination 
            currentPage={props.currentPage}
            onPageChanged={props.onPageChanged}
            totalItemsCount={props.totalUsersCount}
            pageSize={props.pageSize}
            />
            {props.usersData.map(u => <div className={styles.main} key={u.id}>
                <div >
                    <div className={styles.info}>
                        <div>
                            <NavLink to={`/profile/${u.id}`}>
                                <img className={styles.photo}
                                    src={u.photos.small != null
                                        ? u.photos.small
                                        : 'https://www.pinclipart.com/picdir/middle/165-1653686_female-user-icon-png-download-user-colorful-icon.png'} />
                            </NavLink>
                            <span>
                                <span className={styles.name}>{u.name}</span>
                                {u.status 
                                ?<span className={styles.status}>Status: {u.status}</span>
                                :<span className={styles.status}>Status: ---</span>
                                }
                                
                                <span className={styles.country}>
                                    {/* {u.location.city}
                                    <br />
                                    {u.location.country} */}
                                </span>
                            </span>

                        </div>
                        <div>
                            {u.followed
                                ? <button disabled={props.followingInProgress.some(id => id === u.id)} 
                                onClick={() => { props.unfollowThunk(u.id);}}>Unfollow</button>
                                : <button disabled={props.followingInProgress.some(id => id === u.id)}
                                    onClick={() => { props.followThunk(u.id);}}>Follow</button>}
                        </div>
                    </div>

                </div>
            </div>)}
        </div>
    );
}

export default Users;