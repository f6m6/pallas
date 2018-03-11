import moment from 'moment';
import humanizeDuration from 'humanize-duration';
import React, { Component } from 'react';

class DaysSinceLastGig extends Component {
  constructor() {
    super();
    this.state = {
      json: [],
    }

    fetch('http://localhost:4000/days-since-last-gig')
      .then(response => response.json())
      .then(json => this.setState({ json }))
      .then(console.log)

  }

  render() {
    const rows = this.state.json.map(
      ({ daysSinceLastGig }) => { 
      return (<div>
        <span>Days since last gig: </span>
        <span>{
            humanizeDuration(
              moment.duration(
                moment(daysSinceLastGig).diff(moment())
              ), { units: ['y', 'mo', 'w', 'd'], largest: 2 })

          }
        </span>
      </div>);
    });

    return (
      <div>
        <table>
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
    );
  }
}

export default DaysSinceLastGig;
