import React from "react";
import './Toggle.css';

function BarGroup(props) {
  let barPadding = 2
  let barColour = '#348AA7'
  let widthScale = d => d * 6
  let width = widthScale(props.d.value)
  let yMid = props.barHeight * 0.5
  
  return <g className="bar-group">
    <text className="name-label" x="-6" y={yMid} alignmentBaseline="middle" >{props.d.key}</text>
    <rect y={barPadding * 0.5} width={width} height={props.barHeight - barPadding} fill={barColour} />
    <text className="value-label" x={width- 8} y={yMid} alignmentBaseline="middle" >{props.d.value}</text>
  </g>
}

class MostHerd extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isToggleOn: true,
        display: 'block',
        table: [{"default": 0}]
      };
      fetch('http://localhost:8080/test/mostherd')
      .then(response => response.json())
      .then(data => this.setState({table: data},() => console.log(data)))
      .then(console.log("received"))
      .then(console.log(this.state.table))

      // 这个绑定是必要的，使`this`在回调中起作用
      this.handleClick = this.handleClick.bind(this);
    }
    // static getDerivedStateFromProps(props, state){
    //   fetch('http://localhost:8080/test/calAdopRate')
    //   .then(data => this.setState({table: data},() => console.log(data)))
    //   .then(console.log("received"))
    //   .then(console.log(this.state.table))
    // }
    handleClick() {
      this.setState(prevState => ({
        isToggleOn: !prevState.isToggleOn,
        display: prevState.isToggleOn ? 'none': 'block'
      }));
    }

    render() {
      let barHeight = 30
              
      let barGroups = this.state.table.map((d, i) => <g transform={`translate(0, ${i * barHeight})`}>
                                                          <BarGroup d={d} barHeight={barHeight} />
                                                        </g>)                         
      return (
        <div>
          <h> List the top 5 states that adopted the most herding group dogs. (Is there a 
correlation between the number of herding group dogs and the development of 
animal husbandry)?</h>
          <button onClick={this.handleClick}>
            {this.state.isToggleOn ? 'Hide' : 'Show'}
          </button>
          <svg width="800" height="300" style={{display: this.state.display}}>
            <g className="container">
              <text className="title" x="10" y="30"></text>
              <g className="chart" transform="translate(100,60)">
                {barGroups}
              </g>
            </g>
          </svg>
        </div>
      )
    }
}
export default MostHerd;