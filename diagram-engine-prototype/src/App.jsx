import React from 'react';

import { Engine } from './core/engine';
import { traverseNodesFromStart } from './core/queryBuilder'

import { BodyWidget } from './components/BodyWidget';

import { touchHandler } from './utils/touch.utils';

import './App.css';
import 'storm-react-diagrams/dist/style.min.css';

class App extends React.Component {

	constructor(props) {
		super(props);
		this.engine = new Engine();
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
						traverseNodesFromStart(this.engine.getActiveDiagram())
					}}
				>
					Serialize Graph
				</button>
				<BodyWidget engine={this.engine} />
			</div>
		);
	}
}

export default App;
