import NodeModels from '../../core/nodeModels';

import { DIAGRAM_ACTIONS } from '../actionTypes';

/**
 * @typedef {{ settings: object; previousNodeId: string; inLinkId: string; nextNodeId: string; outLinkId: string; }} NodesDictValue
 * @typedef {{ [nodeId: string]: NodesDictValue; }} NodesDict
 * 
 * @typedef {{ sourceNodeId: string; targetNodeId: string; }} LinksDictValue
 * @typedef {{ [linkId: string]: LinksDictValue; }} LinksDict
 * 
 * @typedef {{ selectedNodeId: string; startNodeId: string; endNodeId: string; nodes: NodesDict; links: LinksDict; }} DiagramState
 */

/**
 * @type {DiagramState}
 */
const initialState = {
	selectedNodeId: null,
	startNodeId: null,
	endNodeId: null,
	nodes: {},
	links: {},
}

/**
 * @param {DiagramState} state 
 * @param {{ type: keyof DIAGRAM_ACTIONS }} action 
 * @returns {DiagramState}
 */
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
				nodes: { 
					...state.nodes,
					[node.id]: {
						settings: node.settings,
						previousNodeId: null,
						inLinkId: null,
						nextNodeId: null,
						outLinkId: null,
					}
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
				}, {}),
				// link remove should trigger on its own
			};

		case DIAGRAM_ACTIONS.SELECT_NODE:
			return {
				...state,
				selectedNodeId: action.nodeId
			};

		case DIAGRAM_ACTIONS.SET_NODE_SETTINGS:
			return {
				...state,
				nodes: {
					...state.nodes,
					[action.nodeId]: {
						...state.nodes[action.nodeId],
						settings: action.settings,
					}
				},
			};

		case DIAGRAM_ACTIONS.ADD_LINK:
			return {
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
						targetNodeId: action.targetNodeId
					},
				},
			};

		case DIAGRAM_ACTIONS.REMOVE_LINK:
			const linkData = state.links[action.linkId];
			const updatedSourceNode = !!state.nodes[linkData.sourceNodeId]
				? {
					[linkData.sourceNodeId]: {
						...state.nodes[linkData.sourceNodeId],
						nextNodeId: null,
						outLinkId: null,
					}
				}
				: undefined;
			const updatedTargetNode = !!state.nodes[linkData.targetNodeId]
				? {
					[linkData.targetNodeId]: {
						...state.nodes[linkData.targetNodeId],
						previousNodeId: null,
						inLinkId: null,
					}
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
				}, {}),
			};

		default:
			return state;
	}
}