import NodeData from 'models/nodeData.model';

import AbstractNodeModel, { IN_PORT_LABEL } from './abstract.nodeModel';

export default class EndNodeModel extends AbstractNodeModel {
	static NAME = 'End';
	static COLOR = 'rgb(221, 15, 180)';

	static DEFAULT_NODE_SETTINGS = {};

	constructor(x: number, y: number) {
		super(EndNodeModel.NAME, EndNodeModel.COLOR, EndNodeModel.DEFAULT_NODE_SETTINGS, x, y);

		const inPort = this.addInPort(IN_PORT_LABEL);
		inPort.setMaximumLinks(1);
	}

	run(data: NodeData): NodeData {
		return data;
	}
}
