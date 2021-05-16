import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Form extends Component {
    state = {
        room: '',
        room_password: '',
        username: '',
    }
    onSubmit = (e) => {
        e.preventDefault();
        this.props.form_submit(this.state.username, this.state.room, this.state.room_password);
        this.setState({
            username: '',
            room: '',
            room_password: '',
        });

    }
    onChange = (e) => this.setState({[e.target.name]: e.target.value});
    render(){
        return(
            <div className={"form-container " + this.props.form_style}>
                <form className="form" onSubmit={this.onSubmit}>
                    <div className="form-input-border">
                        <input
                        type="text"
                        name="username"
                        className="form-input-text"
                        placeholder="Username"
                        value={this.state.username}
                        onChange={this.onChange}
                        required
                        />
                    </div>
                    <div className="form-input-border">
                        <input
                        type="text"
                        name="room"
                        className="form-input-text"
                        placeholder="Room Name"
                        value={this.state.room}
                        onChange={this.onChange}
                        required
                        />
                    </div>
                    <div className="form-input-border">
                        <input
                        type="password"
                        name="room_password"
                        className="form-input-text"
                        placeholder="Room Password"
                        value={this.state.room_password}
                        onChange={this.onChange}
                        required
                        />
                    </div>
                    <input
                    type="submit"
                    className="form-submit"
                    value={this.props.submit_text}
                    />
                </form>
            </div>
        );
    }
}

Form.propTypes = {
    submit_text: PropTypes.string.isRequired,
    form_style: PropTypes.string.isRequired,
    form_submit: PropTypes.func.isRequired,
}

export default Form;