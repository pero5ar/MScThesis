import { DefaultNodeModel } from 'storm-react-diagrams';

import { IN_PORT_LABEL } from './';

export default class EndNodeModel extends DefaultNodeModel {
	static NAME = 'End';
	static COLOR = 'rgb(221, 15, 180)';

	static DEFAULT_NODE_SETTINGS = {};

	constructor(x, y) {
		super(EndNodeModel.NAME, EndNodeModel.COLOR);
		this.x = x;
		this.y = y;

		const inPort = this.addInPort(IN_PORT_LABEL);
		inPort.setMaximumLinks(1);

		this.settings = EndNodeModel.DEFAULT_NODE_SETTINGS;
	}
}