
import React from "react";
import './Toggle.css';

function BarGroup(props) {
  let barPadding = 20
  let barColour = '#348AA7'
  let barColour1 = '#333'
  let widthScale = d => d /200
  let width = widthScale(props.d.economy)
  let widthScale1 = d => d *888
  let width1 = widthScale1(props.d.adoptrate)
  let yMid = props.barHeight * 0.5
  
  return <g className="bar-group">
    <text className="name-label" x="-6" y={yMid} alignmentBaseline="middle" >{props.d.state}</text>
    <rect y={barPadding * 0.5} width={width1} height={props.barHeight - barPadding} fill={barColour} />
    <rect y={barPadding * 0.5+10} width={width} height={props.barHeight - barPadding} fill={barColour1} />
    <text className="value-label" x={width- 8} y={yMid+10} alignmentBaseline="middle" >{props.d.economy}</text>
    <text className="value-label" x={width1- 8} y={yMid} alignmentBaseline="middle" >{props.d.adoptrate}</text>
  </g>
}

class EconomyAdopt extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isToggleOn: true,
        display: 'block',
        table: [{"default": 0}]
      };
      fetch('http://localhost:8080/test/economyadopt')
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
          <h> Does the household income affect dog adoption amounts at the state level (list 
adoption rate and avg income for each state)?</h>
          <button onClick={this.handleClick}>
            {this.state.isToggleOn ? 'Hide' : 'Show'}
          </button>
          <svg width="800" height="300" style={{display: this.state.display}}>
            <g className="container">
              <text className="title" x="10" y="30">Adoption rate(blue) and avg income(black)</text>
              <g className="chart" transform="translate(100,60)">
                {barGroups}
              </g>
            </g>
          </svg>
        </div>
      )
    }
}
export default EconomyAdopt;