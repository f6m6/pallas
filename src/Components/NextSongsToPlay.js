import {baseUrl} from '../utils/api';
import moment from 'moment';
import humanizeDuration from 'humanize-duration';
import React, {Component} from 'react';

class NextSongsToPlay extends Component {
  constructor() {
    super();
    this.state = {
      json: []
    }

    fetch(`${baseUrl}/next-songs-to-play`)
      .then(response => response.json())
      .then(json => this.setState({json}))

  }

  render() {
    const coverStyle = { color: "green" }

    const rows = this
      .state
      .json
      .map(({title, count, last_played, cover}) => {
        return (
          <tr key={title}>
            <td style={cover ? coverStyle : null}>{title}</td>
            <td>{count}</td>
            <td>{humanizeDuration(moment.duration(moment(last_played).diff(moment())), {
                units: [
                  'y', 'mo', 'w', 'd'
                ],
                largest: 2,
                round: true
              })
}</td>
          </tr>
        );
      });

    return (
      <div>
        <table>
          <tbody>
            <tr>
              <td><b>Title</b></td>
              <td><b>Plays</b></td>
              <td><b>Last played</b></td>
            </tr>
            {rows}
          </tbody>
        </table>
      </div>
    );
  }
}

export default NextSongsToPlay;
