import React from 'react';

import { Application } from './Application';
import { BodyWidget } from './components/BodyWidget';

import { touchHandler } from './touch.utils';

import './App.css';
import 'storm-react-diagrams/dist/style.min.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.app = new Application();
  }

  componentDidMount() {
    document.addEventListener("touchstart", touchHandler, true);
    document.addEventListener("touchmove", touchHandler, true);
    document.addEventListener("touchend", touchHandler, true);
    document.addEventListener("touchcancel", touchHandler, true);
  }

  render() {
    return (
      <div>
        <button
          type="button"
          onClick={() => {
            console.log(this.app.getActiveDiagram().serializeDiagram());
          }}
        >
          Serialize Graph
        </button>
        <BodyWidget app={this.app} />
      </div>
    );
  }
}

export default App;
