import NodeData, { RowData } from 'models/nodeData.model';

import AbstractNodeModel, { IN_PORT_LABEL, OUT_PORT_LABEL } from './abstract.nodeModel';

interface SelectNodeSettings {
	selectedKeys: string[];
}

export default class SelectNodeModel extends AbstractNodeModel<SelectNodeSettings> {
	static NAME = 'Select';
	static COLOR = 'rgb(0, 70, 234)';

	static DEFAULT_NODE_SETTINGS: SelectNodeSettings = {
		selectedKeys: [],
	};

	constructor(x: number, y: number) {
		super(SelectNodeModel.NAME, SelectNodeModel.COLOR, SelectNodeModel.DEFAULT_NODE_SETTINGS, x, y);

		const inPort = this.addInPort(IN_PORT_LABEL);
		inPort.setMaximumLinks(1);
		const outPort = this.addOutPort(OUT_PORT_LABEL);
		outPort.setMaximumLinks(1);
	}

	run(data: NodeData): NodeData {
		const keys = this._settings.selectedKeys.filter((_key) => data.keys && data.keys.includes(_key));
		const rows = data.rows.map((_row) => {
			const newRow: RowData = {};
			for (let _key of this._settings.selectedKeys) {
				newRow[_key] = _row[_key];
			}
			return newRow;
		});
		return { keys, rows };
	}
}
