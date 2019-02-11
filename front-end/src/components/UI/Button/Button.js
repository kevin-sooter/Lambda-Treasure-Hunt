import './Button.scss';

import React from 'react';

const Button = props => {
  let button_classlist = ['button'];
  if (props.disabled) {
    button_classlist.push('button-disabled');
  }
  if (!props.disabled) {
    button_classlist.push('button-enabled');
  }
  if (props.active) {
    button_classlist.push('button-active');
  }
  return (
    <div className="button-container">
      <div className={button_classlist.join(' ')} onClick={props.clicky}>
        {props.text}
      </div>
    </div>
  );
};

export default Button;
