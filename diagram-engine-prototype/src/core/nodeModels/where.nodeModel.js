import { IN_PORT_LABEL, OUT_PORT_LABEL, AbstractNodeModel } from './abstract.nodeModel';

export default class WhereNodeModel extends AbstractNodeModel {
	static NAME = 'Where';
	static COLOR = 'rgb(232, 228, 16)';

	static DEFAULT_NODE_SETTINGS = {
		key: null,
		condition: null,
	};

	constructor(x, y) {
		super(WhereNodeModel.NAME, WhereNodeModel.COLOR, WhereNodeModel.DEFAULT_NODE_SETTINGS, x, y);

		const inPort = this.addInPort(IN_PORT_LABEL);
		inPort.setMaximumLinks(1);
		const outPort = this.addOutPort(OUT_PORT_LABEL);
		outPort.setMaximumLinks(1);
	}
}