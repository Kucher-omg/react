import React from 'react';
import styles from './ProfileInfo.module.css';


class ProfileStatus extends React.Component {

    state = {
        editMode: false
    }

    ActiveEditMode (){
        this.setState({
            editMode: true
        });
    }

    UnActiveEditMode (){
        this.setState({
            editMode: false
        });
    }

    InputText = React.createRef();
    
    OnTextChange () {
        // debugger
        console.log(this.InputText.current.value);
        let text = this.InputText.current.value;
        this.props.UpdateStatusText(text);
    }

    render() {
        return (
            <div>
                <div className={styles.inblock}>
                    Status: &nbsp;
                </div>
                {!this.state.editMode ?
                <div className={styles.inblock}>
                    <span onClick={this.ActiveEditMode.bind(this)}>
                        {this.props.status}
                    </span>
                </div>
                :
                <div className={styles.inblock}>

                    <input autoFocus={true} ref={this.InputText} onBlur={ this.UnActiveEditMode.bind(this) } onChange={this.OnTextChange.bind(this)} value={this.props.status}/>
                </div>
                }
            </div>
        );
    }

}

export default ProfileStatus;