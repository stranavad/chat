import './App.css';
import React, {Component} from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import ChatPage from './components/ChatPage';
import Menu from './components/Menu';


class App extends Component {
  render(){
    return(
      <Router>
        <div className="app">
          <Menu/>
          <Route 
          exact
          path="/"
          component={ChatPage}
          />
        </div>
      </Router>
    );
  }
}

export default App;
