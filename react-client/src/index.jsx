import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor() {
    super()
  }

  render() {
    return <div>
        hello
        <h1>Item List</h1>
      </div>
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
