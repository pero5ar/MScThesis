import NodeData, { RowData } from 'models/nodeData.model';

import AbstractNodeModel, { IN_PORT_LABEL, OUT_PORT_LABEL } from './abstract.nodeModel';

type _ArrayDict = { [value: string]: number[]; };

interface UnionNodeSettings {
	removeDuplicates: boolean;
}

export default class UnionNodeModel extends AbstractNodeModel<UnionNodeSettings> {
	static NAME = 'Union';
	static COLOR = 'rgb(179, 5, 164)';

	static DEFAULT_NODE_SETTINGS: UnionNodeSettings = {
		removeDuplicates: true,
	};

	constructor(x: number, y: number, noPorts = false) {
		super(UnionNodeModel.NAME, UnionNodeModel.COLOR, UnionNodeModel.DEFAULT_NODE_SETTINGS, x, y);

		if (!noPorts) {
			const inPort1 = this.addInPort(IN_PORT_LABEL);
			inPort1.setMaximumLinks(1);
			const inPort2 = this.addInPort(IN_PORT_LABEL);
			inPort2.setMaximumLinks(1);
			const outPort = this.addOutPort(OUT_PORT_LABEL);
			outPort.setMaximumLinks(1);
		}
	}

	run(data1: NodeData, data2: NodeData): NodeData {
		const keys = data1.keys && data2.keys && data1.keys.filter((_key) => data2.keys.includes(_key));
		let rows: RowData[] = [];
		if (keys.length === 0) {
			return { keys, rows };
		}

		const rowKeysFilter = (_row: RowData): RowData => {
			const newRow: RowData = {};
			for (let _key of keys) {
				// NOTE: this will also keep them in the same order
				newRow[_key] = _row[_key];
			}
			return newRow;
		};
		rows = [ ...data1.rows.map(rowKeysFilter), ...data2.rows.map(rowKeysFilter) ];

		if (!this._settings.removeDuplicates) {
			return { keys, rows };
		}

		// 1st identify the rows that are duplicate for the first key
		const valuesDictForKey0 = rows.reduce((_acc, _row, _index) => {
			const _value = _row[keys[0]];
			if (!_acc[_value]) {
				_acc[_value] = [];
			}
			_acc[_value].push(_index);
			return _acc;
		}, {} as _ArrayDict);

		// 2nd stringify those rows to check for actual duplicates
		const possibleDuplicateRowsByString = Object.keys(valuesDictForKey0).reduce((_acc, _value) => {
			const indicesArray = valuesDictForKey0[_value];
			if (indicesArray.length > 1) {
				for (let _index of indicesArray) {
					const _stringified = JSON.stringify(rows[_index]);
					if (!_acc[_stringified]) {
						_acc[_stringified] = [];
					}
					_acc[_stringified].push(_index);
				}
			}
			return _acc;
		}, {} as _ArrayDict);

		if (Object.keys(possibleDuplicateRowsByString).length === 0) {
			return { keys, rows };
		}

		// 3rd identify duplicates to delete
		const rowsToDelete = new Set<number>();
		Object.keys(possibleDuplicateRowsByString).forEach((_stringified) => {
			const indicesArray = possibleDuplicateRowsByString[_stringified];
			for (let _index of indicesArray.slice(1)) {
				rowsToDelete.add(_index);
			}
		});

		if (rowsToDelete.size === 0) {
			return { keys, rows };
		}
		rows = rows.filter((_row, _index) => !rowsToDelete.has(_index));
		return { keys, rows };
	}
}
