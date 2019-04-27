import { DefaultNodeModel } from 'storm-react-diagrams';

export default class EndNodeModel extends DefaultNodeModel {
	static NAME = 'End';
	static COLOR = 'rgb(221, 15, 180)';

	constructor(x, y) {
		super(EndNodeModel.NAME, EndNodeModel.COLOR);
		this.x = x;
		this.y = y;

		const inPort = this.addInPort(">|");
		inPort.setMaximumLinks(1);
	}
}