import React, { Fragment } from 'react';
import './StatsDisplay.scss';

const Errors = props => {
  if (props.res.errors) {
    if (props.res.errors.length > 0) {
      return <div>Errors: {props.res.errors}</div>;
    } else {
      return null;
    }
  } else {
    return null;
  }
};

const Messages = props => {
  if (props.res.messages) {
    if (props.res.messages.length > 0) {
      return <div>Messages: {props.res.messages}</div>;
    } else {
      return null;
    }
  } else {
    return null;
  }
};

const RoomDetails = props => {
  return (
    <div className="room-details">
      <div>Title: {props.res.title}</div>
      <div>Terrain: {props.res.terrain}</div>
      <Errors res={props.res} />
      <Messages res={props.res} />
    </div>
  );
};

const StatsDisplay = props => {
  return (
    <Fragment>
      <div className="sd-container">
        <div>Current Room: {props.stats.current_room}</div>
        <div>
          {props.stats.rooms_visited} out of {props.stats.max_rooms} traversed
        </div>
        <div>Cooldown: {props.stats.cooldown}</div>
      </div>
      <div className="room-container">
        {props.stats.last_response ? (
          <RoomDetails res={props.stats.last_response} />
        ) : null}
      </div>
    </Fragment>
  );
};

export default StatsDisplay;
