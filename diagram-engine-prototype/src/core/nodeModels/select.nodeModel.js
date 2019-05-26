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

	/**
	 * @param {NodeData} data 
	 * @returns {NodeData}
	 */
	run(data) {
		const keys = this._settings.selectedKeys.filter((_key) => data.keys && data.keys.includes(_key));
		const rows = data.rows.map((_row) => {
			const newRow = {};
			for (let _key of this._settings.selectedKeys) {
				newRow[_key] = _row[_key];
			}
			return newRow;
		});
		return { keys, rows };
	}
}