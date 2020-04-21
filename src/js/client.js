'use strict'

import React from "react";
import ReactDOM from "react-dom";

class Layout extends React.Component {
  constructor() {
    super();
    this.name = "Tsutomu";
  }

  render() {
    const name = "Teppei";

    return (
      <div>
        <h1>Welcome!</h1>
        <h1>Your name is {name}</h1>
        <h1>Your name is {this.name}</h1>
        <h1>{1 + 3}</h1>
        <h1>{this.getSum(5)}</h1>
        <h1>{ ((num) => { return 2 + num; })(5) }</h1>
      </div>
    )
  }

  getSum(num) {
    return 1+num;
  }
}

const app = document.getElementById('app');
ReactDOM.render(<Layout/>, app);
