import moment from 'moment';
import humanizeDuration from 'humanize-duration';
import Datetime from 'react-datetime';
import React, {Component} from 'react';
import styles from './NewSessionForm.css';

export default class NewSessionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: undefined,
      sessionTypes: []
    };

    fetch('http://192.168.0.6:4000/session-types')
      .then(response => response.json())
      .then(json => this.setState({sessionTypes: json, value: json[0].name}))

    this.handleChange = this
      .handleChange
      .bind(this);
    this.handleSubmit = this
      .handleSubmit
      .bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    alert('Your favorite flavor is: ' + this.state.value);

    fetch('http://192.168.0.6:4000/create-session-or-performance', {
      body: JSON.stringify(this.state.value), // must match 'Content-Type' header
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, same-origin, *omit
      headers: { 'content-type': 'application/json' },
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, cors, *same-origin
      redirect: 'follow', // *manual, follow, error
      referrer: 'no-referrer', // *client, no-referrer
    })

    event.preventDefault();
  }

  render() {
    return (
      <div>
        <h1>Add a session</h1>
        <form onSubmit={this.handleSubmit}>
          <label>Type: </label>
          <select value={this.state.value} onChange={this.handleChange}>
            {this
              .state
              .sessionTypes
              .map(row => (
                <option value={row.name}>{row.name}</option>
              ))}
          </select>
          <div />
          <label>Start: </label><Datetime/>
          <label>End: </label><Datetime/>
          <input type="submit" value="Submit"/>
        </form>
      </div>
    );
  }
}