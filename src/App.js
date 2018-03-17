import React, {Component} from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import './App.css';
import NextSongsToPlay from './Components/NextSongsToPlay';
import WhenWasLastGig from './Components/WhenWasLastGig';
import NewSessionForm from './Components/NewSessionForm';

class App extends Component {
  constructor() {
    super();
    this.state = {
      counts: [],
      startDate: undefined,
      endDate: new Date(),
      everythingCounts: [
        {
          date: '3-3-2018',
          count: 100
        }
      ],
      everythingStartDate: undefined,
      everythingEndDate: new Date()
    }

    console.log('hey')
    fetch('http://192.168.0.6:4000/normalised-count-per-day').then(function (response) {
      console.log('hey2', response.body)
      return response.json()
    }).then((json) => {
      console.log('he3')

      console.log(json)
      const startDate = new Date(json[0].date);
      this.setState({counts: json, startDate});
    });
  }
  render() {
    return (
      <div className="App">
        <WhenWasLastGig/>
        <NextSongsToPlay/>
        <div>
          <h1>Heatmap of time spent on music</h1>
          <CalendarHeatmap
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            values={this.state.counts}
            classForValue={(value) => {
            if (!value) {
              return 'color-empty';
            }
            return `color-scale-${value.count}`;
          }}/>
        </div>
        <NewSessionForm />
      </div>
    );
  }
}

export default App;
