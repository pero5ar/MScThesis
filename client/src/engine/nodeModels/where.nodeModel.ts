import NodeData, { RowData } from '../../models/nodeData.model';

import AbstractNodeModel, { IN_PORT_LABEL, OUT_PORT_LABEL } from './abstract.nodeModel';

type ConditionType = 'EQ' | 'NE' | 'LT' | 'LE' | 'GT' | 'GE';

type ConditionValue = string | number;

interface WhereCondition {
	TYPE: ConditionType;
	LABEL: string;
	GET_TEST: (conditionValue: ConditionValue, key: string) => (row: RowData) => boolean;
}

interface WhereNodeSettings {
	key: Nullable<string>;
	conditionValue: ConditionValue;
	conditionType: Nullable<ConditionType>;
}

export default class WhereNodeModel extends AbstractNodeModel<WhereNodeSettings> {
	static NAME = 'Where';
	static COLOR = 'rgb(232, 228, 16)';

	static DEFAULT_NODE_SETTINGS: WhereNodeSettings = {
		key: null,
		conditionValue: '',
		conditionType: null,
	};

	constructor(x: number, y: number) {
		super(WhereNodeModel.NAME, WhereNodeModel.COLOR, WhereNodeModel.DEFAULT_NODE_SETTINGS, x, y);

		const inPort = this.addInPort(IN_PORT_LABEL);
		inPort.setMaximumLinks(1);
		const outPort = this.addOutPort(OUT_PORT_LABEL);
		outPort.setMaximumLinks(1);
	}

	static generateTest(node: WhereNodeModel) {
		const { key, conditionValue, conditionType } = node._settings;
		if (!key || !conditionType || !WHERE_CONDITIONS[conditionType]) {
			return null;
		}
		return WHERE_CONDITIONS[conditionType].GET_TEST(conditionValue, key);
	}

	run(data: NodeData): NodeData {
		const test = WhereNodeModel.generateTest(this);
		const keys = data.keys;
		const rows = !test ? [] : data.rows.filter((_row) => test(_row));
		return { keys, rows };
	}
}

export const WHERE_CONDITIONS: { [K in ConditionType]: WhereCondition; } = {
	EQ: {
		TYPE: 'EQ',
		LABEL: ' = ',
		GET_TEST: (conditionValue: ConditionValue, key: string) => (row: RowData) => row[key] == conditionValue,	// eslint-disable-line eqeqeq
	},
	NE: {
		TYPE: 'NE',
		LABEL: ' <> ',
		GET_TEST: (conditionValue: ConditionValue, key: string) => (row: RowData) => row[key] != conditionValue,	// eslint-disable-line eqeqeq
	},
	LT: {
		TYPE: 'LT',
		LABEL: ' < ',
		GET_TEST: (conditionValue: ConditionValue, key: string) => (row: RowData) => row[key] < conditionValue,
	},
	LE: {
		TYPE: 'LE',
		LABEL: ' <= ',
		GET_TEST: (conditionValue: ConditionValue, key: string) => (row: RowData) => row[key] <= conditionValue,
	},
	GT: {
		TYPE: 'GT',
		LABEL: ' > ',
		GET_TEST: (conditionValue: ConditionValue, key: string) => (row: RowData) => row[key] > conditionValue,
	},
	GE: {
		TYPE: 'GE',
		LABEL: ' >= ',
		GET_TEST: (conditionValue: ConditionValue, key: string) => (row: RowData) => row[key] >= conditionValue,
	},
};
