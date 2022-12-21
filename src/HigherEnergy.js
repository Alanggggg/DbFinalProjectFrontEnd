import React from "react";
import './Toggle.css';

class HigherEnergy extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isToggleOn: true,
        display: 'block',
        table: []
      };
      fetch('http://localhost:8080/test/higherenergy')
      .then(response => response.json())
      .then(data => this.setState({table: data},() => console.log(data)))
      .then(console.log("received"))
      .then(console.log(this.state.table))

      // 这个绑定是必要的，使`this`在回调中起作用
      this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
      this.setState(prevState => ({
        isToggleOn: !prevState.isToggleOn,
        display: prevState.isToggleOn ? 'none': 'block'
      }));
    }

    render() {
      return (
        <div>
          <h>Which dog breed has a higher energy level value than the average energy level value of the dog group that it belongs to?</h>
          <button onClick={this.handleClick}>
            {this.state.isToggleOn ? 'Hide' : 'Show'}
          </button>
          <h style={{display: this.state.display}}>{this.state.table}</h>
        </div>
      )
    }
}
export default HigherEnergy;