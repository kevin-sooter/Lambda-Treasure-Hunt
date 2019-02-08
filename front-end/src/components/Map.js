import React from 'react';
import { FlexibleXYPlot, LineSeries, MarkSeries, XYPlot } from 'react-vis';

class Map extends React.Component {
  constructor() {
    super();

    this.state = {
      coords: [],
      lines: [],
      loading: false,
      test: [{ x: 60, y: 60 }, { x: 61, y: 60 }, { x: 59, y: 60 }],
    };
  }

  storeCoords = () => {
    console.log('store coords');
    const map = this.props.graph;
    let c = [];
    for (let room in map) {
      c.push(map[room][0]);
    }
    this.setState({ coords: c });
  };

  createLines = () => {
    const map = this.props.graph;
    let c = [];
    console.log('create lines');
    for (let room in map) {
      for (let adjacentroom in map[room][1]) {
        // console.log(map[room][0])
        // console.log(map[map[room]])
        if (typeof map[map[room][1][adjacentroom]] === 'undefined') {
        } else {
          console.log('V::::===>', map[map[room][1][adjacentroom]][1]);
          c.push([map[room][0], map[map[room][1][adjacentroom]][0]]);
        }
      }
    }
    console.log(c);
    this.setState({ lines: c });
  };

  generateMap = () => {
    this.storeCoords();
    this.createLines();
    // setTimeout(() => {
    //     console.log("coords ==>", this.state.coords)
    //     console.log("Lines ==> ", this.state.lines)
    // },1000)
  };

  componentDidMount() {
    setTimeout(() => this.generateMap(), 1500);
  }

  render() {
    return (
      <div className="map">
        <h1>TREASURE MAP</h1>
        {/* <button onClick={this.generateMap}>GM</button>    */}

        {/* {this.state.lines.map(line => (
                        <LineSeries strokeWidth="3" color="#E5E5E5" data={line} />
                    ))} */}

        <XYPlot width={1000} height={1000}>
          {this.state.lines.map(points => (
            <LineSeries strokeWidth="2" color="#BAB9B9" data={points} />
          ))}
          {/* <LineSeries strokeWidth="10"color="#ff0000" data={this.state.lines}/> */}
          <MarkSeries
            className="mark-series-example"
            strokeWidth={10}
            opacity="1"
            size="3"
            color="#525959"
            data={this.state.coords}
          />
          <MarkSeries strokeWidth={10} data={[this.props.current]} />
        </XYPlot>
      </div>
    );
  }
}

export default Map;
