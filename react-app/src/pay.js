import React, { Component } from "react";

class Pay extends Component {
  constructor(props){
    super(props);
    this.className = props.className;
    this.fnRef = props.onclick;
  }

  render() {
    return (
      <li onClick = {this.fnRef}>
        <i className={this.className}></i>
        <span>Pay</span>
      </li>
    );
  }
}

export default Pay;
