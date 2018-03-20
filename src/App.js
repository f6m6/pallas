import React, {Component} from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import './App.css';
import NextSongsToPlay from './Components/NextSongsToPlay';
import WhenWasLastGig from './Components/WhenWasLastGig';
import NewSessionForm from './Components/NewSessionForm';
import {baseUrl} from './utils/api';
import moment from 'moment';

class App extends Component {
  constructor() {
    console.log(`baseUrl = ${baseUrl}`)
    super();
    this.state = {
      counts: [],
      startDate: moment()
        .subtract(5, 'weeks')
        .toDate(),
      endDate: new Date()
    }

    console.log('hey')
    fetch(`${baseUrl}/normalised-count-per-day`).then(function (response) {
      return response.json()
    }).then((json) => {
      this.setState({counts: json});
    });
  }
  render() {
    return (
      <div className="App">
        <WhenWasLastGig/>
        <NextSongsToPlay/>
        <div>
          <h1>Heatmap of time spent on music</h1>
          <div style={{
            width: 300
          }}>
            <CalendarHeatmap
              startDate={this.state.startDate}
              endDate={this.state.endDate}
              values={this.state.counts}
              showOutOfRangeDays
              showMonthLabels={false}
              classForValue={(value) => {
              if (!value) {
                return 'color-empty';
              }
              return `color-scale-${value.count}`;
            }}/>
          </div>
        </div>
        <NewSessionForm/>
      </div>
    );
  }
}

export default App;
