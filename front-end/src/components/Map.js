import React, { Component } from 'react';
import { FlexibleXYPlot, LineSeries, MarkSeries } from 'react-vis';

class Map extends Component {
  state = {};
  render() {
    const { coords, links } = this.props;
    return (
      <div
        style={{
          margin: 'auto',
          marginRight: '25%',
          width: '100%',
          height: '100%',
          flex: 1,
          padding: '3rem 2rem',
        }}
      >
        <FlexibleXYPlot>
          {links.map(link => (
            <LineSeries strokeWidth="3" color="#DDDDDD" data={link} />
          ))}
          <MarkSeries
            className="mark-series-example"
            strokeWidth={5}
            opacity="1"
            size="2"
            color="#525959"
            data={coords}
          />
        </FlexibleXYPlot>
      </div>
    );
  }
}

export default Map;