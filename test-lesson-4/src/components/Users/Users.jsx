import * as axios from 'axios';
import React from 'react';
import styles from './users.module.css';


class Users extends React.Component {

    componentDidMount() {
        
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.SetUsers(response.data.items);
                debugger;
                this.props.SetUsersSize(response.data.totalCount);
            });
    }

    onPageChanged = (p) => {
        this.props.setCurrentPage(p);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${p}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.SetUsers(response.data.items);
            });
    }

    render() {

        let pageCount = Math.ceil( this.props.totalUsersCount / this.props.pageSize);
        let pages = [];
        for (let i = 1; i <= pageCount; i++){
            pages.push(i);
        }
         
        return (
            <div>
                <div>
                    {pages.map(p => {
                       return <span 
                       className={this.props.currentPage === p 
                        && styles.selectedPage}
                        onClick={(e) => {this.onPageChanged(p);}}>{p}</span>
                    })}
                </div>
                {this.props.usersData.map(u => <div className={styles.main} key={u.id}>
                    <div >
                        <div className={styles.info}>
                            <div>
                                <img className={styles.photo}
                                    src={u.photos.small != null
                                        ? u.photos.small
                                        : 'https://cdn.jpegmini.com/user/images/slider_puffin_before_mobile.jpg'} />
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
                                    ? <button onClick={() => { this.props.unfollow(u.id) }}>Unfollow</button>
                                    : <button onClick={() => { this.props.follow(u.id) }}>Follow</button>}
                                {/* <button>Follow</button> */}
                            </div>
                        </div>

                    </div>
                </div>)}
            </div>
        );
    }
}


export default Users;