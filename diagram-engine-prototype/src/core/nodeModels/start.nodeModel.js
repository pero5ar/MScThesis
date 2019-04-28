import { OUT_PORT_LABEL, AbstractNodeModel } from './abstract.nodeModel';

export default class StartNodeModel extends AbstractNodeModel {
	static NAME = 'Start';
	static COLOR = 'rgb(79, 219, 24)';

	static DEFAULT_NODE_SETTINGS = {};

	constructor(x, y) {
		super(StartNodeModel.NAME, StartNodeModel.COLOR, StartNodeModel.DEFAULT_NODE_SETTINGS, x, y);

		const outPort = this.addOutPort(OUT_PORT_LABEL);
		outPort.setMaximumLinks(1);
	}
}