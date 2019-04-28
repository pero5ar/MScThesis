import { DefaultNodeModel } from 'storm-react-diagrams';

import { OUT_PORT_LABEL } from './';

export default class StartNodeModel extends DefaultNodeModel {
	static NAME = 'Start';
	static COLOR = 'rgb(79, 219, 24)';

	static DEFAULT_NODE_SETTINGS = {};

	constructor(x, y) {
		super(StartNodeModel.NAME, StartNodeModel.COLOR);
		this.x = x;
		this.y = y;

		const outPort = this.addOutPort(OUT_PORT_LABEL);
		outPort.setMaximumLinks(1);

		this.settings = StartNodeModel.DEFAULT_NODE_SETTINGS;
	}
}