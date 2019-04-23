import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {
      users: []
    }
  }

  fetchData = () => {
    axios
      .get('http://localhost:5000/api/users/')
      .then(res => {
        console.log(res)
        this.setState({ users: res.data })
      })
      .catch(err => {
        console.log(err)
      })
  }

  componentDidMount() {
    this.fetchData();
  }
  

  render() {
    console.log(this.state)
    return (
      <div className="App">
        {this.state.users.map(user => {
          return (
            <h4 key={user.id}>
            Name: {user.name} <br/>
            Bio: {user.bio}
            </h4>
          )
        })}
      </div>
    )
  }
}

export default App;
