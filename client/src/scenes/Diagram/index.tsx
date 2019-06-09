import * as React from 'react';

import * as Engine from 'engine';

import { touchHandler } from 'utils/touch.util';

class Diagram extends React.PureComponent {
	ref: Nullable<HTMLDivElement> = null;

	setRef = (ref: HTMLDivElement) => {
		this.ref = ref;
		ref.addEventListener('touchstart', touchHandler, true);
		ref.addEventListener('touchmove', touchHandler, true);
		ref.addEventListener('touchend', touchHandler, true);
		ref.addEventListener('touchcancel', touchHandler, true);
	}

	onClick = () => console.log(Engine.getInstance().getActiveDiagram().serializeDiagram())

	render() {
		return (
			<div ref={this.setRef}>
				<button
					type="button"
					onClick={this.onClick}
				>
					Serialize Graph
				</button>
				{/* TODO: <Body /> */}
			</div>
		);
	}
}

export default Diagram;