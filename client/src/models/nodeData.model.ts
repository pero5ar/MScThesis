export type RowData = { [key: string]: string | number; };

export default class NodeData {
	keys: string[];
	rows: RowData[];

	constructor(keys: string[], rows: RowData[]) {
		this.keys = keys;
		this.rows = rows;
	}

	static isEqual(testData: NodeData, expectedData: NodeData, isRowOrderImportant: boolean) {
		if (testData.keys.length !== expectedData.keys.length) {
			return false;
		}
		if (testData.rows.length !== expectedData.rows.length) {
			return false;
		}
		if (expectedData.keys.some((_key) => !testData.keys.includes(_key))) {
			return false;
		}

		const _sortAndStringifyRow = (_row: RowData) => JSON.stringify(_row, expectedData.keys);
		const expectedDataRowStrings = expectedData.rows.map(_sortAndStringifyRow);
		const testDataRowStrings = testData.rows.map(_sortAndStringifyRow);

		if (isRowOrderImportant) {
			if (expectedDataRowStrings.some((_rowString, _index) => _rowString !== testDataRowStrings[_index])) {
				return false;
			}
		}
		if (!isRowOrderImportant) {
			if (expectedDataRowStrings.some((_rowString) => !testDataRowStrings.includes(_rowString))) {
				return false;
			}
		}
		return true;
	}
}
