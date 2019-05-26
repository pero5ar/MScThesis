import { IN_PORT_LABEL, OUT_PORT_LABEL, AbstractNodeModel } from './abstract.nodeModel';

export const WHERE_CONDITION_TYPES = {
	EQ: {
		TYPE: 'EQ',
		LABEL: ' = ',
		GET_TEST: (conditionValue, key) => (row) => row[key] == conditionValue,
	},
	NE: {
		TYPE: 'NE',
		LABEL: ' <> ',
		GET_TEST: (conditionValue, key) => (row) => row[key] != conditionValue,
	},
	LT: {
		TYPE: 'LT',
		LABEL: ' < ',
		GET_TEST: (conditionValue, key) => (row) => row[key] < conditionValue,
	},
	LE: {
		TYPE: 'LE',
		LABEL: ' <= ',
		GET_TEST: (conditionValue, key) => (row) => row[key] <= conditionValue,
	},
	GT: {
		TYPE: 'GT',
		LABEL: ' > ',
		GET_TEST: (conditionValue, key) => (row) => row[key] > conditionValue,
	},
	GE: {
		TYPE: 'GE',
		LABEL: ' >= ',
		GET_TEST: (conditionValue, key) => (row) => row[key] >= conditionValue,
	},
}

export default class WhereNodeModel extends AbstractNodeModel {
	static NAME = 'Where';
	static COLOR = 'rgb(232, 228, 16)';

	static DEFAULT_NODE_SETTINGS = {
		key: null,
		conditionValue: '',
		conditionType: null,
	};

	/**
	 * @param {WhereNodeModel} node
	 * @returns {(row: { [key: string]: any }) => boolean}
	 */
	static generateTest(node) {
		const { key, conditionValue, conditionType } = node._settings;
		if (!key || !conditionType || !WHERE_CONDITION_TYPES[conditionType]) {
			return null;
		}
		return WHERE_CONDITION_TYPES[conditionType].GET_TEST(conditionValue, key);
	}

	constructor(x, y) {
		super(WhereNodeModel.NAME, WhereNodeModel.COLOR, WhereNodeModel.DEFAULT_NODE_SETTINGS, x, y);

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
		const test = WhereNodeModel.generateTest(this);
		const keys = data.keys;
		const rows = !test ? [] : data.rows.filter((_row) => test(_row));
		return { keys, rows };
	}
}