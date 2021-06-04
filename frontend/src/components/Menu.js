import React, {Component} from 'react';

class Menu extends Component {

    render () {
        return(
            <div className="menu-container">
                <div className="menu">
                    <div className="menu-logo">
                        <a href="/">The Space</a>
                    </div>
                    <div className="menu-items">
                        <a href="/">Link 1</a>
                        <a href="/">Link 1</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default Menu;