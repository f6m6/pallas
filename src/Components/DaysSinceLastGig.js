import moment from 'moment';
import humanizeDuration from 'humanize-duration';
import React, {Component} from 'react';

class DaysSinceLastGig extends Component {
  constructor() {
    super();
    this.state = {
      daysSinceLastGig: Infinity
    }

    fetch('http://localhost:4000/last-gig-date')
      .then(response => response.json())
      .then(({lastGigDate}) => this.setState({
        daysSinceLastGig: humanizeDuration(moment.duration(moment().diff(moment(lastGigDate))), {
          units: [
            'y', 'mo', 'w', 'd'
          ],
          largest: 2
        })
      }));
  }

  render() {
    const {daysSinceLastGig} = this.state;

    return (
      <div>
        <span>Days since last gig:
        </span>
        <span>{daysSinceLastGig}
        </span>
      </div>
    );
  };
}

export default DaysSinceLastGig;
