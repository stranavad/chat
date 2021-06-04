import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ShowMembers from './ShowMembers';
import ShowMessages from './ShowMessages';
import SendMessage from './SendMessage';

class Chat extends Component {
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
            <div className="chat">
                <div className="horizontal-flex">
                    <div className="members-container">
                        <div className="members-info"><p>{this.props.username}</p></div>
                        <div className="members">
                            <ShowMembers members={this.props.members}/>
                        </div>
                    </div>
                    <div className="chat-right-side">
                        <div className="messages-container">
                            <div className="room-info">
                                <p>{this.props.room}</p>
                                <div>
                                    <button onClick={this.props.leaveRoom} className="room-button leave">Leave</button>
                                    <button onClick={this.props.clearConversation} className="room-button clear">Clear</button>
                                </div>
                            </div>
                            <div className="messages">
                                <ShowMessages messages={this.props.messages}/>
                            </div>
                        </div>
                        <div className="send-message-container">
                            <SendMessage sendMessage={this.props.sendMessage}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Chat.propTypes = {
    messages: PropTypes.array,
    username: PropTypes.string,
    members: PropTypes.array,
    room: PropTypes.string,
    sendMessage: PropTypes.func,
    clearConversation: PropTypes.func.isRequired,
    leaveRoom: PropTypes.func.isRequired,
}

export default Chat;