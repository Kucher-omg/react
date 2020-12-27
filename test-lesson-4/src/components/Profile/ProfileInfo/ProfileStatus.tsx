import React, { ChangeEvent } from 'react';
import styles from './ProfileInfo.module.css';

type PropsType = {
    updateStatus: (text: string) => void,
    userStatus: string,
}

type StateType = {
    editMode: boolean
    userStatus: string
}

class ProfileStatus extends React.Component<PropsType, StateType> {
 
    state = {
        editMode: false, 
        userStatus: this.props.userStatus
    }

    ActiveEditMode = () => {
        this.setState({
            editMode: true
        });
    }

    UnActiveEditMode = () => {
        this.setState({
            editMode: false
        });
        this.props.updateStatus(this.state.userStatus);
    }

    
    OnStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState ({
            userStatus: e.currentTarget.value
        })
    }

    componentDidUpdate(prevProps: PropsType, prevState: StateType) {
        if(prevProps.userStatus !== this.props.userStatus){
            this.setState ({
                userStatus: this.props.userStatus
            })
        }
    }

    render() {
        return (
            <div>
                <div className={styles.inblock}>
                    Status: &nbsp;
                </div>
                {!this.state.editMode ?
                <div className={styles.inblock}>
                    <span className={styles.status} onClick={this.ActiveEditMode}>
                        {this.state.userStatus  ? this.state.userStatus : "No Status"}
                    </span>
                </div>
                :
                <div className={styles.inblock}>

                    <input onChange={this.OnStatusChange}
                     autoFocus={true}
                     onBlur={ this.UnActiveEditMode } 
                     value={this.state.userStatus}/>
                </div>
                }
            </div>
        );
    }

}

export default ProfileStatus;