import React from 'react';

import * as Engine from './core/engine';

import Body from './components/Body';

import { touchHandler } from './utils/touch.utils';
import { traverseNodesFromStart } from './utils/engine.utils.js';

import './App.css';
import 'storm-react-diagrams/dist/style.min.css';

class App extends React.Component {

	constructor(props) {
		super(props);
		this.engine = Engine.getInstance();
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
						console.log(this.engine.getActiveDiagram().serializeDiagram());
						traverseNodesFromStart();
					}}
				>
					Serialize Graph
				</button>
				<Body />
			</div>
		);
	}
}

export default App;
