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
			const node = action.payload.node;
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
				startNodeId: action.payload.nodeId === state.startNodeId ? null : state.startNodeId,
				endNodeId: action.payload.nodeId === state.endNodeId ? null : state.endNodeId,
				selectedNodeId: action.payload.nodeId === state.selectedNodeId ? null : state.selectedNodeId,
				nodes: Object.keys(state.nodes).reduce((_obj, _key) => {
					if (_key !== action.payload.nodeId) {
						_obj[_key] = state.nodes[_key];
					}
					return _obj;
				}, {} as DiagramState['nodes']),
				dataByNode: Object.keys(state.dataByNode).reduce((_obj, _key) => {
					if (_key !== action.payload.nodeId) {
						_obj[_key] = state.dataByNode[_key];
					}
					return _obj;
				}, {} as DiagramState['dataByNode']),
				// link remove should trigger on its own
			};

		case DIAGRAM_ACTIONS.SELECT_NODE:
			return {
				...state,
				selectedNodeId: action.payload.nodeId,
				dataByNode: isNodeConnectedToStart(state, action.payload.nodeId)
					? updateDataByNodesWithMissingNodes(state, action.payload.nodeId as string)
					: state.dataByNode,
			};

		case DIAGRAM_ACTIONS.SET_NODE_SETTINGS:
			const previousNodeId = state.nodes[action.payload.nodeId].previousNodeId;

			return {
				...state,
				nodes: {
					...state.nodes,
					[action.payload.nodeId]: {
						...state.nodes[action.payload.nodeId],
						settings: action.payload.settings,
					},
				},
				dataByNode: !!state.dataByNode[action.payload.nodeId]
					? {
						...getDataByNodesWithoutSucceedingNodes(state, action.payload.nodeId),
						[action.payload.nodeId]: callNodeRun(action.payload.nodeId, previousNodeId ? state.dataByNode[previousNodeId] : undefined),
					} : state.dataByNode,
			};

		case DIAGRAM_ACTIONS.ADD_LINK:
			const newState = {
				...state,
				nodes: {
					...state.nodes,
					[action.payload.sourceNodeId]: {
						...state.nodes[action.payload.sourceNodeId],
						nextNodeId: action.payload.targetNodeId,
						outLinkId: action.payload.linkId,
					},
					[action.payload.targetNodeId]: {
						...state.nodes[action.payload.targetNodeId],
						previousNodeId: action.payload.sourceNodeId,
						inLinkId: action.payload.linkId,
					},
				},
				links: {
					...state.links,
					[action.payload.linkId]: {
						sourceNodeId: action.payload.sourceNodeId,
						targetNodeId: action.payload.targetNodeId,
					},
				},
			};
			if (isNodeConnectedToStart(state, action.payload.sourceNodeId)) {	// update data if new link is on path from start
				newState.dataByNode = updateDataByNodesWithMissingNodes(newState, action.payload.targetNodeId);
			}
			return newState;

		case DIAGRAM_ACTIONS.REMOVE_LINK:
			const linkData = state.links[action.payload.linkId];
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
					if (_key !== action.payload.linkId) {
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
