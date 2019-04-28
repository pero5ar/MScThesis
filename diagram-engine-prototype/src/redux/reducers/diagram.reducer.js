import NodeModels from '../../core/nodeModels';

import { DIAGRAM_ACTIONS } from '../actionTypes';

const initialState = {
	selectedNodeId: null,
	startNodeId: null,
	endNodeId: null,
	nodeSettings: {},
}

export default function diagramReducer(state = initialState, action) {
	switch (action.type) {

		case DIAGRAM_ACTIONS.ADD_NODE:
			const node = action.node;
			if (!node) {
				return state;
			}
			const isStartNode = node instanceof NodeModels.StartNodeModel;
			const isEndNode = node instanceof NodeModels.EndNodeModel;

			if (state.startNodeId && isStartNode) {
				console.error('Diagram already has start node, deleting invalid node: ', node);
				node.remove();
				return state;
			}
			if (state.endNodeId && isEndNode) {
				console.error('Diagram already has end node, deleting invalid node: ', node);
				node.remove();
				return state;
			}
			if (isStartNode && isEndNode) {
				console.error('Node cannot be start and end node at the same time, deleting invalid node: ', node);
				node.remove();
				return state;
			}
			node.isTracked = true;
			return {
				...state,
				startNodeId: isStartNode ? node.id : state.startNodeId,
				endNodeId: isEndNode ? node.id : state.endNodeId,
				nodeSettings: { ...state.nodeSettings, [node.id]: node.settings },
			};

		case DIAGRAM_ACTIONS.REMOVE_NODE:
			return {
				...state,
				startNodeId: action.nodeId === state.startNodeId ? null : state.startNodeId,
				endNodeId: action.nodeId === state.endNodeId ? null : state.endNodeId,
				selectedNodeId: action.nodeId === state.selectedNodeId ? null : state.selectedNodeId,
				nodeSettings: Object.keys(state.nodeSettings).reduce((_obj, _key) => {
					if (_key !== action.nodeId) {
						_obj[_key] = state.nodeSettings[_key];
					}
					return _obj;
				}, {})
			};

		case DIAGRAM_ACTIONS.SELECT_NODE:
			return { ...state, selectedNodeId: action.nodeId };

		case DIAGRAM_ACTIONS.SET_NODE_SETTINGS:
			return { ...state, nodeSettings: { ...state.nodeSettings, [action.nodeId]: action.nodeSettings } };

		default:
			return state;
	}
}