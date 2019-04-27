import { DefaultNodeModel } from 'storm-react-diagrams';

export default class WhereNodeModel extends DefaultNodeModel {
	static NAME = 'Where';
	static COLOR = 'rgb(232, 228, 16)';

	constructor(x, y) {
		super(WhereNodeModel.NAME, WhereNodeModel.COLOR);
		this.x = x;
		this.y = y;

		const inPort = this.addInPort(">|");
		inPort.setMaximumLinks(1);
		const outPort = this.addOutPort("|>");
		outPort.setMaximumLinks(1);
	}
}