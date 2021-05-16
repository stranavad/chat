import React, {Component} from 'react';
import PropTypes from 'prop-types';

class ShowMessages extends Component {
    render(){
        return this.props.messages.map((message) => (
            <div className="message">
                <h3 className="message-text">{message}</h3>
            </div>
        ));
    }
}

ShowMessages.propTypes = {
    messages: PropTypes.array,
}

export default ShowMessages;