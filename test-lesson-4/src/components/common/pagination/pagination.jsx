import styles from './pagination.module.css';
import React from 'react';

const Pagination = ({totalUsersCount, pageSize, currentPage, onPageChanged}) => {

    let pageCount = Math.ceil(totalUsersCount / pageSize);
    let pages = [];
    for (let i = 1; i <= pageCount; i++) {
        pages.push(i);
    }

    return (
        <div>
            {pages.map(p => {
                return <span
                    className={currentPage === p
                        && styles.selectedPage}
                    onClick={(e) => { onPageChanged(p); }}>{p}</span>
            })}
        </div>
    );
}

export default Pagination;