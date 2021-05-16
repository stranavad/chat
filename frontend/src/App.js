import './App.css';
import React, {Component} from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import ChatPage from './components/ChatPage';
import AboutPage from './components/ChatPage';


class App extends Component {
  render(){
    return(
      <Router>
        <div className="app">
          <div className="menu"></div>
        </div>
        <Route 
        exact
        path="/"
        component={ChatPage}
        />
        <Route
        exact
        path="/about"
        component={AboutPage}
        />
      </Router>
    );
  }
}

export default App;
