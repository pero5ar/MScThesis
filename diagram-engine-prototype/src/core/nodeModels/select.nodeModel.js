import { DefaultNodeModel } from 'storm-react-diagrams';

export default class SelectNodeModel extends DefaultNodeModel {
	static NAME = 'Select';
	static COLOR = 'rgb(0, 70, 234)';

	constructor(x, y) {
		super(SelectNodeModel.NAME, SelectNodeModel.COLOR);
		this.x = x;
		this.y = y;

		const inPort = this.addInPort(">|");
		inPort.setMaximumLinks(1);
		const outPort = this.addOutPort("|>");
		outPort.setMaximumLinks(1);
	}
}