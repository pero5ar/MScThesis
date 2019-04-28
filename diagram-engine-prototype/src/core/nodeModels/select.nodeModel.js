import { IN_PORT_LABEL, OUT_PORT_LABEL, AbstractNodeModel } from './abstract.nodeModel';

export default class SelectNodeModel extends AbstractNodeModel {
	static NAME = 'Select';
	static COLOR = 'rgb(0, 70, 234)';

	static DEFAULT_NODE_SETTINGS = {
		selectedKeys: [],
	};

	constructor(x, y) {
		super(SelectNodeModel.NAME, SelectNodeModel.COLOR, SelectNodeModel.DEFAULT_NODE_SETTINGS, x, y);

		const inPort = this.addInPort(IN_PORT_LABEL);
		inPort.setMaximumLinks(1);
		const outPort = this.addOutPort(OUT_PORT_LABEL);
		outPort.setMaximumLinks(1);
	}
}