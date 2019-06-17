import { NodeModels } from 'engine';

import * as DIAGRAM_ACTIONS from './diagram.actionTypes';
import { DiagramAction } from './diagram.actionCreators';
import { DiagramState } from './diagram.stateModel';

import { getDataByNodesWithoutSucceedingNodes, updateDataByNodesWithMissingNodes, isNodeConnectedToStartOnAllEnds } from 'utils/diagram.util';
import { callNodeRun } from 'utils/engine.util';

const initialState: DiagramState = {
	selectedNodeId: null,
	startNodeIds: [],
	endNodeId: null,
	nodes: {},
	links: {},
	dataByNode: {},
};

export default function diagramReducer(state: DiagramState = initialState, action: DiagramAction): DiagramState {
	switch (action.type) {
		case DIAGRAM_ACTIONS.SET_STATE:
			const payloadState = action.payload.state || undefined;
			return { ...initialState, ...payloadState };

		case DIAGRAM_ACTIONS.ADD_NODE:
			const node = action.payload.node;
			if (!node) {
				return state;
			}
			const isStartNode = node instanceof NodeModels.StartNodeModel;
			const isEndNode = node instanceof NodeModels.EndNodeModel;

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
			return {
				...state,
				startNodeIds: isStartNode ? [ ...state.startNodeIds, node.id ] : state.startNodeIds,
				endNodeId: isEndNode ? node.id : state.endNodeId,
				nodes: {
					...state.nodes,
					[node.id]: {
						settings: node.settings,
						previousNodeIds: [],
						inLinkIds: [],
						nextNodeIds: [],
						outLinkIds: [],
					},
				},
			};

		case DIAGRAM_ACTIONS.REMOVE_NODE:
			return {
				...state,
				startNodeIds: state.startNodeIds.includes(action.payload.nodeId)
					? state.startNodeIds.filter((_nodeId) => _nodeId !== action.payload.nodeId)
					: state.startNodeIds,
				endNodeId: action.payload.nodeId === state.endNodeId ? null : state.endNodeId,
				selectedNodeId: action.payload.nodeId === state.selectedNodeId ? null : state.selectedNodeId,
				nodes: Object.keys(state.nodes).reduce((_obj, _key) => {
					if (_key !== action.payload.nodeId) {
						_obj[_key] = state.nodes[_key];
						// link removal will update nextNodeIds and previousNodeIds
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
				dataByNode: isNodeConnectedToStartOnAllEnds(state, action.payload.nodeId)
					? updateDataByNodesWithMissingNodes(state, action.payload.nodeId as string)
					: state.dataByNode,
			};

		case DIAGRAM_ACTIONS.SET_NODE_SETTINGS:
			const shouldUpdateDataByNode = !!state.dataByNode[action.payload.nodeId];
			const previousNodeIds = state.nodes[action.payload.nodeId].previousNodeIds;

			const dataByNode = !shouldUpdateDataByNode ? state.dataByNode : {
				...getDataByNodesWithoutSucceedingNodes(state, action.payload.nodeId),
				[action.payload.nodeId]: callNodeRun(action.payload.nodeId, ...previousNodeIds.map((_nodeId) => state.dataByNode[_nodeId])),
			};
			return {
				...state,
				nodes: {
					...state.nodes,
					[action.payload.nodeId]: {
						...state.nodes[action.payload.nodeId],
						settings: action.payload.settings,
					},
				},
				dataByNode,
			};

		case DIAGRAM_ACTIONS.ADD_LINK:
			const newState: DiagramState = {
				...state,
				nodes: {
					...state.nodes,
					[action.payload.sourceNodeId]: {
						...state.nodes[action.payload.sourceNodeId],
						nextNodeIds: [ ...state.nodes[action.payload.sourceNodeId].nextNodeIds, action.payload.targetNodeId ],
						outLinkIds: [ ...state.nodes[action.payload.sourceNodeId].outLinkIds, action.payload.linkId ],
					},
					[action.payload.targetNodeId]: {
						...state.nodes[action.payload.targetNodeId],
						previousNodeIds: [ ...state.nodes[action.payload.targetNodeId].previousNodeIds, action.payload.sourceNodeId ],
						inLinkIds: [ ...state.nodes[action.payload.targetNodeId].inLinkIds, action.payload.linkId ],
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
			if (isNodeConnectedToStartOnAllEnds(state, action.payload.sourceNodeId)) {
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
						nextNodeIds: state.nodes[linkData.sourceNodeId].nextNodeIds.filter((_nodeId) => _nodeId !== linkData.targetNodeId),
						outLinkId: state.nodes[linkData.sourceNodeId].outLinkIds.filter((_linkId) => _linkId !== action.payload.linkId),
					},
				}
				: undefined;
			const updatedTargetNode = !!state.nodes[linkData.targetNodeId]
				? {
					[linkData.targetNodeId]: {
						...state.nodes[linkData.targetNodeId],
						previousNodeIds: state.nodes[linkData.targetNodeId].previousNodeIds.filter((_nodeId) => _nodeId !== linkData.sourceNodeId),
						inLinkId: state.nodes[linkData.targetNodeId].inLinkIds.filter((_linkId) => _linkId !== action.payload.linkId),
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
