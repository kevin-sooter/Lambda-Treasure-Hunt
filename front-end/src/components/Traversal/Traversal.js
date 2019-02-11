import React, { Component } from 'react';
import axios from 'axios';
import ReactTimeout from 'react-timeout';
import StatsDisplay from '../Traversal/StatsDisplay';
import ControlPanel from './ControlPanel';

class Traversal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // current_room: null,
      exits: [],
      coordinates: [],
      cooldown: null,
      cooldown_cleared: true,
      // visited_rooms: {},
      current_path: [],
      traversal_path: [],
      num_explored: 1,
      last_response: {},
      config: {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Token 20865f632ad70adc799af8aeb4baf2b0f557810b',
        },
      },
      auto_enabled: false,
      max_rooms: 500,
    };
  }

  componentDidMount() {
    this.init();
  }

  init = () => {
    const config = this.state.config;
    let url = 'https://lambda-treasure-hunt.herokuapp.com/api/adv/init/';
    axios
      .get(url, config)
      .then(res => {
        this.update_state(res.data);
      })
      .catch(err => {
        console.log(err);
      });

    // LOCAL STORAGE DEBUGGING

    console.log(
      'LOCAL-CURRENT_PATH: ',
      localStorage.getItem('current_path'),
      ' TYPE: ',
      typeof localStorage.getItem('current_path')
    );
    console.log(
      'LOCAL-TRAVERSAL_PATH: ',
      localStorage.getItem('traversal_path'),
      ' TYPE: ',
      typeof localStorage.getItem('traversal_path')
    );

    // Retrieve previous visited_rooms from local storage
    // and set on state

    // MOVED TO APP
    // if (
    //   localStorage.getItem("visited_rooms") !== "null" &&
    //   localStorage.getItem("visited_rooms") !== null
    // ) {
    //   console.log("Found visited_rooms in localstorage");
    //   let visited_rooms = JSON.parse(localStorage.getItem("visited_rooms"));
    //   let num_explored = Object.keys(visited_rooms).length;
    //   this.setState(
    //     {
    //       // visited_rooms,
    //       num_explored
    //     },
    //     () => {
    //       this.props.update_graph_handler(visited_rooms);
    //       this.log_coordinates();
    //     }
    //   );
    // }
    if (
      localStorage.getItem('current_path') !== 'null' &&
      localStorage.getItem('current_path') !== null
    ) {
      console.log('Found current_path in localstorage');
      let current_path = JSON.parse(localStorage.getItem('current_path'));
      this.setState({
        current_path,
      });
    }
    if (
      localStorage.getItem('traversal_path') !== 'null' &&
      localStorage.getItem('traversal_path') !== null
    ) {
      console.log('Found traversal_path in localstorage');
      let traversal_path = JSON.parse(localStorage.getItem('traversal_path'));
      this.setState({
        traversal_path,
      });
    }
  };

  log_coordinates = () => {
    let visited_rooms = { ...this.props.visited_rooms };
    let current_room = this.props.current_room;
    if (current_room !== null) {
      if (current_room in visited_rooms) {
      } else {
        visited_rooms[current_room] = {
          n: '?',
          s: '?',
          w: '?',
          e: '?',
          coordinates: [],
        };
      }
      let coordinates = this.state.coordinates;
      let current_visited = visited_rooms[current_room];
      if (current_visited.coordinates.length === 0) {
        current_visited.coordinates = coordinates;
        // TODO: No longer setting state here
        // Need to refactor
        this.props.update_graph_handler(visited_rooms);
        console.log('COORDINATES LOGGED: ', current_visited.coordinates);
      }
    }
  };

  request_travel = direction => {
    const config = this.state.config;
    const data = { direction: direction };
    // if (this.state.current_room in this.props.visited_rooms) {
    //   let visited_rooms = this.props.visited_rooms;
    //   let current_room = this.props.current_room;
    //   let current_log = visited_rooms[current_room];
    //   if (current_log[direction] !== "?" && current_log[direction] !== "-") {
    //     data.next_room_id = current_log[direction];
    //   }
    // }
    console.log('REQUESTED DATA: ', data);
    let url = 'https://lambda-treasure-hunt.herokuapp.com/api/adv/move/';
    // console.log("axios.post(", url, ", ", data, ", ", config, ")"); // <-- Debugging
    return axios
      .post(url, data, config)
      .then(res => {
        this.update_state(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  update_state = res => {
    console.log('RESPONSE: ', res);
    if ('room_id' in res) {
      this.setState(
        {
          last_response: res,
          // current_room: res.room_id,
          exits: res.exits,
          coordinates: this.coordinates_to_arr(res.coordinates),
          cooldown: res.cooldown,
          cooldown_cleared: false,
        },
        () => {
          this.log_coordinates();
          this.props.update_current_room_handler(res.room_id);
        }
      );
      this.handle_cooldown(res.cooldown);
    } else {
      this.setState({
        last_response: res,
      });
    }
  };

  pick_unexplored = () => {
    let exits = this.state.exits.slice();
    let current = this.props.current_room;
    let visited_rooms = { ...this.props.visited_rooms };
    let unexplored = [];
    let directions = ['n', 's', 'e', 'w'];

    // check if current room has object in visited
    // if not, create it
    if (current in visited_rooms) {
    } else {
      visited_rooms[current] = {
        n: '?',
        s: '?',
        w: '?',
        e: '?',
        coordinates: [],
      };
    }

    for (let i = 0; i < directions.length; i++) {
      if (exits.includes(directions[i])) {
        if (visited_rooms[current][directions[i]] === '?') {
          unexplored.push(directions[i]);
        }
      } else {
        visited_rooms[current][directions[i]] = '-';
      }
    }

    this.setState({ visited_rooms });

    if (unexplored.length === 0) {
      return null;
    } else {
      return unexplored[Math.floor(Math.random(unexplored.length))];
    }
  };

  move_player = () => {
    let current_room = this.props.current_room;
    let direction = this.pick_unexplored();
    // console.log("Direction: ", direction); // <-- Debugging
    let current_path = this.state.current_path.slice();
    if (direction === null) {
      direction = this.reverse_direction(current_path.pop());
      this.setState({ current_path: current_path });
    } else {
      current_path.push(direction);
      this.setState({ current_path: current_path });
    }

    this.request_travel(direction).then(() => {
      console.log(
        'Current: ',
        current_room,
        ' Next: ',
        this.props.current_room
      );
      if (current_room !== this.props.current_room) {
        // Checking if we have a new current room
        let next_room = this.props.current_room;
        this.log_travel(current_room, next_room, direction);
      } else {
        console.log('Something went wrong, you did not move');
      }
      this.log_coordinates();
    });
  };

  log_travel = (current_room, next_room, direction) => {
    if (current_room !== null) {
      let traversal_path = this.state.traversal_path.slice();
      let visited_rooms = { ...this.props.visited_rooms };
      let num_explored = this.state.num_explored;
      let current_path = this.state.traversal_path.slice();

      traversal_path.push(direction);
      if (next_room in visited_rooms) {
      } else {
        visited_rooms[next_room] = {
          n: '?',
          s: '?',
          w: '?',
          e: '?',
          coordinates: [],
        };
        num_explored++;
      }
      visited_rooms[current_room][direction] = next_room;
      visited_rooms[next_room][
        this.reverse_direction(direction)
      ] = current_room;

      localStorage.setItem('visited_rooms', JSON.stringify(visited_rooms));
      localStorage.setItem('current_path', JSON.stringify(current_path));
      localStorage.setItem('traversal_path', JSON.stringify(traversal_path));
      this.setState({ traversal_path, num_explored }, () => {
        this.props.update_graph_handler(visited_rooms);
      });
    }
  };

  reverse_direction = direction => {
    if (direction === 'n') {
      return 's';
    }
    if (direction === 's') {
      return 'n';
    }
    if (direction === 'w') {
      return 'e';
    }
    if (direction === 'e') {
      return 'w';
    }
  };

  coordinates_to_arr = tuple => {
    let result = '';
    for (let i = 1; i < tuple.length - 1; i++) {
      result += tuple[i];
    }
    return result.split(',');
  };

  clear_local_storage = () => {
    localStorage.setItem('visited_rooms', null);
    localStorage.setItem('current_path', null);
    localStorage.setItem('traversal_path', null);
    console.log('STORAGE CLEARED');
  };

  handle_cooldown = time => {
    this.props.setTimeout(this.clear_cooldown, time * 1000);
  };

  clear_cooldown = () => {
    this.setState({ cooldown_cleared: true });
    this.auto_loop();
  };

  handle_move_click = () => {
    this.move_player();
  };

  toggle_auto = () => {
    this.setState({ auto_enabled: !this.state.auto_enabled });
  };

  auto_loop = () => {
    if (Object.keys(this.props.visited_rooms).length < this.state.max_rooms) {
      if (this.state.auto_enabled) {
        this.move_player();
      }
    } else {
      this.setState({ auto_enabled: false });
      console.log('ALL ROOMS TRAVERSED. WOOT!!!');
    }
  };

  render() {
    return (
      <div className="traversal-container">
        <StatsDisplay
          stats={{
            last_response: this.state.last_response,
            current_room: this.props.current_room,
            rooms_visited: Object.keys(this.props.visited_rooms).length,
            max_rooms: this.state.max_rooms,
            cooldown: this.state.cooldown,
          }}
        />
        <ControlPanel
          move={{
            clicky: this.handle_move_click,
            disabled: !this.state.cooldown_cleared,
          }}
          clear={{ clicky: this.clear_local_storage }}
          auto={{ clicky: this.toggle_auto, active: this.state.auto_enabled }}
        />
      </div>
    );
  }
}

export default ReactTimeout(Traversal);
