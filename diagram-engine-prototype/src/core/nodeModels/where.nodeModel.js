import { DefaultNodeModel } from 'storm-react-diagrams';

import { IN_PORT_LABEL, OUT_PORT_LABEL } from './';

export default class WhereNodeModel extends DefaultNodeModel {
	static NAME = 'Where';
	static COLOR = 'rgb(232, 228, 16)';

	static DEFAULT_NODE_SETTINGS = {
		key: null,
		condition: null,
	};

	constructor(x, y) {
		super(WhereNodeModel.NAME, WhereNodeModel.COLOR);
		this.x = x;
		this.y = y;

		const inPort = this.addInPort(IN_PORT_LABEL);
		inPort.setMaximumLinks(1);
		const outPort = this.addOutPort(OUT_PORT_LABEL);
		outPort.setMaximumLinks(1);

		this.settings = WhereNodeModel.DEFAULT_NODE_SETTINGS;
	}
}