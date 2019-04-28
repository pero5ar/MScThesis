import { IN_PORT_LABEL, AbstractNodeModel } from './abstract.nodeModel';

export default class EndNodeModel extends AbstractNodeModel {
	static NAME = 'End';
	static COLOR = 'rgb(221, 15, 180)';

	static DEFAULT_NODE_SETTINGS = {};

	constructor(x, y) {
		super(EndNodeModel.NAME, EndNodeModel.COLOR, EndNodeModel.DEFAULT_NODE_SETTINGS, x, y);

		const inPort = this.addInPort(IN_PORT_LABEL);
		inPort.setMaximumLinks(1);
	}
}