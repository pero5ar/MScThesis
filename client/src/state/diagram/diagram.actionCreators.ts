import * as DIAGRAM_ACTIONS from './diagram.actionTypes';

import { NodeModel } from 'engine';

interface AddNode extends ReduxAction {
	type: typeof DIAGRAM_ACTIONS.ADD_NODE;
	payload: {
		node: NodeModel;
	};
}
export function ADD_NODE(node: NodeModel): AddNode {
	return {
		type: DIAGRAM_ACTIONS.ADD_NODE,
		payload: { node },
	};
}

interface RemoveNode extends ReduxAction {
	type: typeof DIAGRAM_ACTIONS.REMOVE_NODE;
	payload: {
		nodeId: string;
	};
}
export function REMOVE_NODE(nodeId: string): RemoveNode {
	return {
		type: DIAGRAM_ACTIONS.REMOVE_NODE,
		payload: { nodeId },
	};
}

interface SelectNode extends ReduxAction {
	type: typeof DIAGRAM_ACTIONS.SELECT_NODE;
	payload: {
		nodeId: Nullable<string>;
	};
}
export function SELECT_NODE(nodeId: Nullable<string>): SelectNode {
	return {
		type: DIAGRAM_ACTIONS.SELECT_NODE,
		payload: { nodeId },
	};
}

interface SetNodeSettings extends ReduxAction {
	type: typeof DIAGRAM_ACTIONS.SET_NODE_SETTINGS;
	payload: {
		nodeId: string;
		settings: object;
	};
}
export function SET_NODE_SETTINGS(nodeId: string, settings: object): SetNodeSettings {
	return {
		type: DIAGRAM_ACTIONS.SET_NODE_SETTINGS,
		payload: { nodeId, settings },
	};
}

interface AddLink extends ReduxAction {
	type: typeof DIAGRAM_ACTIONS.ADD_LINK;
	payload: {
		linkId: string;
		sourceNodeId: string;
		targetNodeId: string;
	};
}
export function ADD_LINK(linkId: string, sourceNodeId: string, targetNodeId: string): AddLink {
	return {
		type: DIAGRAM_ACTIONS.ADD_LINK,
		payload: { linkId, sourceNodeId, targetNodeId },
	};
}

interface RemoveLink extends ReduxAction {
	type: typeof DIAGRAM_ACTIONS.REMOVE_LINK;
	payload: {
		linkId: string;
	};
}
export function REMOVE_LINK(linkId: string): RemoveLink {
	return {
		type: DIAGRAM_ACTIONS.REMOVE_LINK,
		payload: { linkId },
	};
}

export type DiagramAction = AddNode | RemoveNode | SelectNode | SetNodeSettings | AddLink | RemoveLink;
