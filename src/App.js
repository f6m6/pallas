import React, { Component } from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import './App.css';
import NextSongsToPlay from './Components/NextSongsToPlay';
import DaysSinceLastGig from './Components/DaysSinceLastGig';

class App extends Component {
  constructor() {
    super();
    this.state = {
      counts: [],
      startDate: undefined,
      endDate: new Date(),
    }

    fetch('http://localhost:4000/song-performances-counts-per-date')
      .then(function(response) {
        return response.json()
      }).then((json) => {
        const startDate = new Date(json[0].date);
        this.setState({counts: json, startDate });
      });

  }
  render() {
    return (
      <div className="App">
        <NextSongsToPlay />
        <div>
          <span>Gigs</span>
          <DaysSinceLastGig />
          <CalendarHeatmap
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            values={this.state.counts}
            classForValue={(value) => {
              if (!value) {
                return 'color-empty';
              }
              return `color-scale-${value.count}`;
            }}
          />
          </div>
      </div>
    );
  }
}

export default App;
