import React, { Component } from 'react';
import Highcharts from 'highcharts';
import {
  HighchartsChart, HighchartsProvider, XAxis, YAxis, Title, Legend, LineSeries
} from 'react-jsx-highcharts';
import ExampleCode from '../utils/ExampleCode';
import code from './exampleCode';
import { createRandomData } from '../utils/data-helpers';

class AddSeries extends Component {

  constructor (props) {
    super(props);

    const now = Date.now();
    this.state = {
      now,
      series: [{
        name: 'Profit',
        data: createRandomData(now, 1e8)
      }],
      seriesCounter: 1
    };
  }

  createRandomSeries = index => {
    return {
      name: `Series${index}`,
      data: createRandomData(this.state.now, 1e8)
    };
  }

  handleAddSeries = e => {
    e.preventDefault();
    let { series, seriesCounter } = this.state;
    seriesCounter++;
    series.push(
      this.createRandomSeries(seriesCounter)
    );

    this.setState({
      series,
      seriesCounter
    });
  }

  handleRemoveSeries = e => {
    e.preventDefault();
    const { series } = this.state;
    const randomIndex = Math.floor(Math.random() * series.length);
    series.splice(randomIndex, 1);

    this.setState({
      series
    });
  }

  renderSeries = ({ name, data }) => {
    return (
      <LineSeries name={name} key={name} data={data} />
    );
  }

  render () {
    return (
      <div className="app">
        <HighchartsProvider Highcharts={Highcharts}>
          <HighchartsChart>
            <Title>Dynamically add/remove series</Title>

            <Legend align="left">
              <Legend.Title>Legend</Legend.Title>
            </Legend>

            <XAxis type="datetime">
              <XAxis.Title>Time</XAxis.Title>
            </XAxis>

            <YAxis>
              <YAxis.Title>Price</YAxis.Title>
              {this.state.series.map(this.renderSeries)}
            </YAxis>
          </HighchartsChart>
        </HighchartsProvider>
        <div className="btn-toolbar" role="toolbar">
          <button className="btn btn-primary" onClick={this.handleAddSeries}>Add line series</button>
          <button className="btn btn-danger" onClick={this.handleRemoveSeries}>Remove line series</button>
        </div>

        <ExampleCode name="AddSeries">{code}</ExampleCode>
      </div>
    );
  }
}

export default AddSeries;
