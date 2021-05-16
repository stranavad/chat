import React, {Component} from 'react';
import Form from './Form';
import Chat from './Chat';
// import socketIOClient from "socket.io-client";
import io from 'socket.io-client';

class ChatPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            room: '',
            room_password: '',
            members: [],
            connected: false,
            endpoint: "http://localhost:5000",
            forms_component:
                <div className="forms-div">
                    <Form submit_text="Connect" form_style="connect-form" form_submit={this.connectRoom}/>
                    <Form submit_text="Create" form_style="create-form" form_submit={this.createRoom}/>
                </div>,
            chat_component: '',
            status_message: '',
            messages: []
        };

        //this.socket = socketIOClient("http://127.0.0.1:5000");
        //this.socket.connect();
        this.socket = io.connect("http://localhost:5000", { reconnect: true, transports: ['polling', 'websocket']});
        // { reconnect: true, transports: ['websocket', 'polling'] }
        console.log(this.socket);
        this.socket.on("status_message", data => {
            this.setState({status_message: data});
        });

        this.socket.on("message", data => {
            let new_messages;
            new_messages = this.state.messages;
            new_messages.push(data);
            this.setState({messages : new_messages});
            console.log(this.state.messages);
        });

        this.socket.on("room_connect", data => {
            console.log("Room connect");
            this.setState({
                username: data.username,
                room: data.room,
                room_password: data.room_password,
                members: data.members,
                connected: true
            });
        });

        this.socket.on("edit_members", data => {
            this.setState({
                members: data.members,
            });
        });
        //this.socket.disconnect();
        this.socket.on("disconnect", function(){
            this.socket.emit("disconnect_user", {
                username: this.state.username,
                room: this.state.room
            })
        });
    }

    sendMessage = (message) => {
        this.socket.send({username: this.state.username, message: message, room: this.state.room})
    }

    
    connectRoom = (username, room, password) => {
        this.socket.emit("user_connect", {username, room, password});
    }

    createRoom = (username, room, password) => {
        this.socket.emit("create_room", {username, room, password});
    } 
    // TODO connect these two into one


    render(){
        let component;
        if (this.state.connected){
            component = <Chat username={this.state.username} room={this.state.room} members={this.state.members} messages={this.state.messages} sendMessage={this.sendMessage}/>;
        } else {
            component = this.state.forms_component;
        }
        // <Chat username={this.state.username} messages={this.state.messages} room_name={this.state.room} members={this.state.members}/>
        let status_message;
        this.state.status_message !== "ok" ? status_message = this.state.status_message : status_message = "Everything fine";
        return(
            <div className="chat-page">
                {component}
                <p className="status-message">
                    {status_message}
                </p>
            </div>
        );
    }

}

export default ChatPage;