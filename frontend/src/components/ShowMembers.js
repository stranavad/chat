import React, {Component} from 'react';
import PropTypes from 'prop-types';

class ShowMembers extends Component {
    render(){
        return this.props.members.map((member) => (
            <div className="member">
                <h3 className="member-text">{member}</h3>
            </div>
        ));
    }
}

ShowMembers.propTypes = {
    members: PropTypes.array,
}

export default ShowMembers;