import React from "react";
import { Dropdown, Option } from "./Dropdown";
import uuid from 'react-uuid';
import Table from "./Table"

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      value: "",
      breeds: [],
      table:[{"default": 0}],
      sizeValue: "",
      sizes: [] 
    };

    this.handleSelect = this.handleSelect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSizeSelect=this.handleSizeSelect.bind(this);
    this.handleSizeSubmit=this.handleSizeSubmit.bind(this);
  }

  handleSelect(event) {
    this.setState({ value: event.target.value });
  }

  handleSizeSelect(event) {
    this.setState({ sizeValue: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch('http://127.0.0.1:8080/test/selectByBreed?breed=' + this.state.value)
      .then(response => response.json())
      .then(data => this.setState({table: data}))
      .then(console.log(this.state.table))
  }

  handleSizeSubmit(event) {
    event.preventDefault();
    fetch('http://127.0.0.1:8080/test/selectBySize?size=' + this.state.sizeValue)
      .then(response => response.json())
      .then(data => this.setState({table: data}))
      .then(console.log(this.state.table))
  }


  componentDidMount() {
    fetch('http://127.0.0.1:8080/test/allFNames')
        .then(response => response.json())
        .then(data => this.setState({ breeds: data }))
    fetch('http://127.0.0.1:8080/test/selectAllSizes')
        .then(response => response.json())
        .then(data => this.setState({ sizes: data }))
}


  render() {
    return (
      <div>
        <h1>Pet Adoption
        </h1>
        <Dropdown
          formLabel="Choose a breed"
          buttonText="Send form"
          onChange={this.handleSelect}
          onSubmit={this.handleSubmit}
          value={this.state.value}>
          {this.state.breeds.map(name => <Option key={uuid()} value={name}/>)}
        </Dropdown>
        <Dropdown
          formLabel="Choose a size"
          buttonText="Send form"
          onChange={this.handleSizeSelect}
          onSubmit={this.handleSizeSubmit}
          value={this.state.sizeValue}>
          {this.state.sizes.map(size => <Option key={uuid()} value={size}/>)}
        </Dropdown>
        <Table data={this.state.table}/>
      </div>

  )
}
}

export default App;