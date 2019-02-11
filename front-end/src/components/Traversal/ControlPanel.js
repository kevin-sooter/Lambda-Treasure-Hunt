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
    </div>
  );
};

export default ControlPanel;
