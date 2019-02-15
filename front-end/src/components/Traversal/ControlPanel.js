import React from 'react';
import Button from '../UI/Button/Button';
import './ControlPanel.scss';

const ControlPanel = props => {
  return (
    <div className="cp-wrapper">
      <Button
        text="Move"
        clicky={props.move.clicky}
        disabled={props.move.disabled}
      />
      <Button
        text="Clear Storage"
        clicky={props.clear.clicky}
        disabled={false}
      />
      <Button
        text="Auto Traverse"
        clicky={props.auto.clicky}
        disabled={false}
        active={props.auto.active}
      />
      <Button
        text="North"
        // clicky={props.move.clicky}
        // disabled={props.move.disabled}
      />
      <Button
        text="South"
        // clicky={props.move.clicky}
        // disabled={props.move.disabled}
      />
      <Button
        text="East"
        // clicky={props.move.clicky}
        // disabled={props.move.disabled}
      />
      <Button
        text="West"
        // clicky={props.move.clicky}
        // disabled={props.move.disabled}
      />
      <Button
        text="Pick up Treasure"
        // clicky={props.move.clicky}
        // disabled={props.move.disabled}
      />
      <Button
        text="Sell Treasure"
        // clicky={props.move.clicky}
        // disabled={props.move.disabled}
      />
      <Button
        text="Drop Treasure"
        // clicky={props.move.clicky}
        // disabled={props.move.disabled}
      />
    </div>
  );
};

export default ControlPanel;
