import React, {Component} from 'react';
import PropTypes from 'prop-types';

class SendMessage extends Component {
    state = {
        message: '',
    }
    onSubmit = (e) => {
        e.preventDefault();
        this.props.sendMessage(this.state.message);
        this.setState({
            message: ''
        });

    }
    onChange = (e) => this.setState({[e.target.name]: e.target.value});
    render(){
        return(
            <form className="message-container" onSubmit={this.onSubmit}>
                <input
                type="text"
                name="message"
                className="message"
                placeholder="Message"
                value={this.state.message}
                onChange={this.onChange}
                required
                />
                <input
                type="submit"
                className="send-button"
                value="Send"
                />
            </form>
        );
    }
}

SendMessage.propTypes = {
    sendMessage: PropTypes.func.isRequired
}

export default SendMessage;