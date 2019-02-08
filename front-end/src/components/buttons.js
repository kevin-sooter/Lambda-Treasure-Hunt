import React from 'react';

class Buttons extends React.Component {
  render() {
    return (
      <div className="buttons">
        <button
          onClick={() => {
            this.props.move('n');
          }}
          className="button-axes axes-U"
        >
          <i className="arrow arrow-up" />
        </button>

        <button
          onClick={() => {
            this.props.move('w');
          }}
          className="button-axes axes-L"
        >
          <i className="arrow arrow-left" />
        </button>
        <button
          onClick={() => {
            this.props.move('e');
          }}
          className="button-axes axes-R"
        >
          <i className="arrow arrow-right" />
        </button>

        <button
          onClick={() => {
            this.props.move('s');
          }}
          className="button-axes axes-D"
        >
          <i className="arrow arrow-down" />
        </button>
      </div>
    );
  }
}
export default Buttons;
