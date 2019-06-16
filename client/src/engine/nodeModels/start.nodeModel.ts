import NodeData from 'models/nodeData.model';

import AbstractNodeModel, { OUT_PORT_LABEL } from './abstract.nodeModel';

export default class StartNodeModel extends AbstractNodeModel {
	static NAME = 'Start';
	static COLOR = 'rgb(79, 219, 24)';

	static DEFAULT_NODE_SETTINGS = {};

	input: Nullable<NodeData>;

	constructor(x: number, y: number) {
		super(StartNodeModel.NAME, StartNodeModel.COLOR, StartNodeModel.DEFAULT_NODE_SETTINGS, x, y);

		const outPort = this.addOutPort(OUT_PORT_LABEL);
		outPort.setMaximumLinks(1);

		this.input = null;
	}

	run(): NodeData {
		return this.input || { keys: [], rows: []};
	}
}
