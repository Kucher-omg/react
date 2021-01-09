import React from 'react';
import { useSelector } from 'react-redux';
import { getIsFetching } from '../../Redux/users-selectors';
import Preloader from '../common/Preloader/Preloader';
import Users from './Users';


type UsersPagePropsType = {

}

const UsersPage: React.FC<UsersPagePropsType> = (props) => {
    
    const isFetching = useSelector(getIsFetching)

    return (
        <div>
            {isFetching ? < Preloader /> : null}

            <Users />
        </div>
    );
}

export default UsersPage