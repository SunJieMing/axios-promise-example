import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getFriends } from '../actions';
import axios from 'axios';

class Friends extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.submitNewFriend = this.submitNewFriend.bind(this);
  }

  componentDidMount() {
    this.props.getFriends();
  }

  handleInputChange(event) {
    this.setState({
      inputValue: event.target.value,
    });
  }

  submitNewFriend() {
    const newFriend = {
      name: this.state.inputValue,
      age: 55,
      email: 'asdf@asdf.com',
    };
    const promise = axios.post('http://localhost:5000/new-friend', newFriend);
    promise.then((response) => {
      this.props.getFriends();
      this.setState({
        inputValue: '',
      });
    });
  }

  render() {
    return (
      <div>
        <input value={this.state.inputValue} onChange={this.handleInputChange} />
        <button onClick={this.submitNewFriend}>Submit</button>
        <ul>
          {this.props.friends.map((friend, i) => {
            return (
              <li key={i}>
                <p>Friend</p>
                <p>Name: {friend.name}</p>
                <p>Age: {friend.age}</p>
                <p>Email: {friend.email}</p>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    friends: state.friends,
  };
};

export default connect(mapStateToProps, { getFriends })(Friends);
