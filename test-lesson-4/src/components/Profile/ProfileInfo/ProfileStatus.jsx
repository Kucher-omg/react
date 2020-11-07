import React from 'react';
import styles from './ProfileInfo.module.css';


class ProfileStatus extends React.Component {

    state = {
        editMode: false, 
        status: this.props.status
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
        this.props.updateStatus(this.state.status);
    }

    
    OnStatusChange = (e) => {
        this.setState ({
            status: e.currentTarget.value
        })
    }

    render() {
        return (
            <div>
                <div className={styles.inblock}>
                    Status: &nbsp;
                </div>
                {!this.state.editMode ?
                <div className={styles.inblock}>
                    <span onClick={this.ActiveEditMode}>
                        {this.props.status}
                    </span>
                </div>
                :
                <div className={styles.inblock}>

                    <input onChange={this.OnStatusChange}
                     autoFocus={true}
                     onBlur={ this.UnActiveEditMode } 
                     value={this.state.status ? this.state.status : "No Status"}/>
                </div>
                }
            </div>
        );
    }

}

export default ProfileStatus;