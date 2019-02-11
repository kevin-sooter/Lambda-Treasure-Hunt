import React, { Component } from 'react';
import './App.css';

import Traversal from './components/Traversal/Traversal';
import MapState from './components/Map/MapState';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      graph: {},
      current_room: null,
      show_ui: true,
    };
  }

  componentDidMount() {
    this.init();
  }

  init = () => {
    console.log(
      'LOCAL-VISITED_ROOMS: ',
      localStorage.getItem('visited_rooms'),
      ' TYPE: ',
      typeof localStorage.getItem('visited_rooms')
    );

    if (
      localStorage.getItem('visited_rooms') !== 'null' &&
      localStorage.getItem('visited_rooms') !== null
    ) {
      console.log('Found visited_rooms in localstorage');
      let graph = JSON.parse(localStorage.getItem('visited_rooms'));
      this.setState({
        graph,
      });
    }
  };

  update_graph_handler = graph => {
    this.setState({ graph });
  };

  update_current_room_handler = current_room => {
    this.setState({ current_room });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Traversal
            update_graph_handler={this.update_graph_handler}
            update_current_room_handler={this.update_current_room_handler}
            visited_rooms={this.state.graph}
            current_room={this.state.current_room}
            show_ui={this.state.show_ui}
          />
          {Object.keys(this.state.graph).length === 0 ? null : (
            <MapState
              graph={this.state.graph}
              current_room={this.state.current_room}
            />
          )}
        </header>
      </div>
    );
  }
}

export default App;
