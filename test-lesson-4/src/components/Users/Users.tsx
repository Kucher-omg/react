import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './users.module.css';
import Pagination from '../common/pagination/pagination';
import { UsersDataType } from '../../types/types';
import UsersSurchForm from './UsersSurchForm';
import { FilterType } from '../../Redux/users-reducer';

type PropsType = {
    currentPage: number,
    onPageChanged: (pageNumber: number) => void,
    totalUsersCount: number,
    pageSize: number,
    usersData: Array<UsersDataType>,
    followingInProgress: Array<number>,
    unfollowThunk: (id: number) => void,
    followThunk: (id: number) => void,
    onFilterChange: (filter: FilterType) => void
}

let Users: React.FC<PropsType> = (props) => {

    return (
        <div>
            <UsersSurchForm onFilterChange={props.onFilterChange}/>
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
                                    ? <span className={styles.status}>Status: {u.status}</span>
                                    : <span className={styles.status}>Status: ---</span>
                                }

                            </span>

                        </div>
                        <div>
                            {u.followed
                                ? <button disabled={props.followingInProgress.some(id => id === u.id)}
                                    onClick={() => { props.unfollowThunk(u.id); }}>Unfollow</button>
                                : <button disabled={props.followingInProgress.some(id => id === u.id)}
                                    onClick={() => { props.followThunk(u.id); }}>Follow</button>}
                        </div>
                    </div>

                </div>
            </div>)}
        </div>
    );
}


export default Users;