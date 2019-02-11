import React from 'react';
import MapNode from './MapNode';
import { Grid, Cell } from 'styled-css-grid';
import './MapContainer.scss';

const MyGrid = (width, height, current_room, graph) => {
  let cord_permutations = [];
  for (let i = 0; i < width.length; i++) {
    for (let j = 0; j < height.length; j++) {
      cord_permutations.push(
        <MapNode
          className={'node ' + width[i] + height[j]}
          active={false}
          x={width[i]}
          y={height[j]}
          graph={graph}
          current_room={current_room}
        />
      );
    }
  }
  return (
    <Grid columns={height.length} gap="2px">
      {cord_permutations.map((item, index) => (
        <Cell key={index} cords={item}>
          {item}
        </Cell>
      ))}
    </Grid>
  );
};

const MapContainer = props => {
  return (
    <div className="map-container">
      {props.grid_coords
        ? MyGrid(
            props.grid_coords.x,
            props.grid_coords.y,
            props.current_room,
            props.graph
          )
        : null}
    </div>
  );
};

export default MapContainer;
