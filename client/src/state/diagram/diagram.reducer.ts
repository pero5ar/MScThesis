import { NodeModels } from 'engine';

import * as DIAGRAM_ACTIONS from './diagram.actionTypes';
import { DiagramAction } from './diagram.actionCreators';
import { DiagramState } from './diagram.stateModel';

import { getDataByNodesWithoutSucceedingNodes, updateDataByNodesWithMissingNodes, isNodeConnectedToStart } from 'utils/diagram.util';
import { callNodeRun } from 'utils/engine.util';

const initialState: DiagramState = {
	selectedNodeId: null,
	startNodeId: null,
	endNodeId: null,
	nodes: {},
	links: {},
	dataByNode: {},
};

export default function diagramReducer(state: DiagramState = initialState, action: DiagramAction): DiagramState {
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
				nodes: {
					...state.nodes,
					[node.id]: {
						settings: node.settings,
						previousNodeId: null,
						inLinkId: null,
						nextNodeId: null,
						outLinkId: null,
					},
				},
			};

		case DIAGRAM_ACTIONS.REMOVE_NODE:
			return {
				...state,
				startNodeId: action.nodeId === state.startNodeId ? null : state.startNodeId,
				endNodeId: action.nodeId === state.endNodeId ? null : state.endNodeId,
				selectedNodeId: action.nodeId === state.selectedNodeId ? null : state.selectedNodeId,
				nodes: Object.keys(state.nodes).reduce((_obj, _key) => {
					if (_key !== action.nodeId) {
						_obj[_key] = state.nodes[_key];
					}
					return _obj;
				}, {} as DiagramState['nodes']),
				dataByNode: Object.keys(state.dataByNode).reduce((_obj, _key) => {
					if (_key !== action.nodeId) {
						_obj[_key] = state.dataByNode[_key];
					}
					return _obj;
				}, {} as DiagramState['dataByNode']),
				// link remove should trigger on its own
			};

		case DIAGRAM_ACTIONS.SELECT_NODE:
			return {
				...state,
				selectedNodeId: action.nodeId,
				dataByNode: isNodeConnectedToStart(state, action.nodeId)
					? updateDataByNodesWithMissingNodes(state, action.nodeId)
					: state.dataByNode,
			};

		case DIAGRAM_ACTIONS.SET_NODE_SETTINGS:
			const previousNodeId = state.nodes[action.nodeId].previousNodeId;

			return {
				...state,
				nodes: {
					...state.nodes,
					[action.nodeId]: {
						...state.nodes[action.nodeId],
						settings: action.settings,
					},
				},
				dataByNode: !!state.dataByNode[action.nodeId]
					? {
						...getDataByNodesWithoutSucceedingNodes(state, action.nodeId),
						[action.nodeId]: callNodeRun(action.nodeId, previousNodeId ? state.dataByNode[previousNodeId] : undefined),
					} : state.dataByNode,
			};

		case DIAGRAM_ACTIONS.ADD_LINK:
			const newState = {
				...state,
				nodes: {
					...state.nodes,
					[action.sourceNodeId]: {
						...state.nodes[action.sourceNodeId],
						nextNodeId: action.targetNodeId,
						outLinkId: action.linkId,
					},
					[action.targetNodeId]: {
						...state.nodes[action.targetNodeId],
						previousNodeId: action.sourceNodeId,
						inLinkId: action.linkId,
					},
				},
				links: {
					...state.links,
					[action.linkId]: {
						sourceNodeId: action.sourceNodeId,
						targetNodeId: action.targetNodeId,
					},
				},
			};
			if (isNodeConnectedToStart(state, action.sourceNodeId)) {	// update data if new link is on path from start
				newState.dataByNode = updateDataByNodesWithMissingNodes(newState, action.targetNodeId);
			}
			return newState;

		case DIAGRAM_ACTIONS.REMOVE_LINK:
			const linkData = state.links[action.linkId];
			if (!linkData) {
				return state;
			}
			const updatedSourceNode = !!state.nodes[linkData.sourceNodeId]
				? {
					[linkData.sourceNodeId]: {
						...state.nodes[linkData.sourceNodeId],
						nextNodeId: null,
						outLinkId: null,
					},
				}
				: undefined;
			const updatedTargetNode = !!state.nodes[linkData.targetNodeId]
				? {
					[linkData.targetNodeId]: {
						...state.nodes[linkData.targetNodeId],
						previousNodeId: null,
						inLinkId: null,
					},
				}
				: undefined;

			return {
				...state,
				nodes: {
					...state.nodes,
					...updatedSourceNode,
					...updatedTargetNode,
				},
				links: Object.keys(state.links).reduce((_obj, _key) => {
					if (_key !== action.linkId) {
						_obj[_key] = state.links[_key];
					}
					return _obj;
				}, {} as DiagramState['links']),
				dataByNode: updatedTargetNode
					? getDataByNodesWithoutSucceedingNodes(state, linkData.targetNodeId, true)
					: state.dataByNode,
			};

		default:
			return state;
	}
}
