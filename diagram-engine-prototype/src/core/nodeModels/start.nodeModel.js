import { DefaultNodeModel } from 'storm-react-diagrams';

export default class StartNodeModel extends DefaultNodeModel {
	static NAME = 'Start';
	static COLOR = 'rgb(79, 219, 24)';

	constructor(x, y) {
		super(StartNodeModel.NAME, StartNodeModel.COLOR);
		this.x = x;
		this.y = y;

		const outPort = this.addOutPort("|>");
		outPort.setMaximumLinks(1);
	}
}