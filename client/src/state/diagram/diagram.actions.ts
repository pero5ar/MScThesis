import { Dispatch } from 'redux';

import * as Engine from 'engine';

import * as DIAGRAM_ACTIONS from './diagram.actionCreators';

import * as EngineUtil from 'utils/engine.util';

type DiagramAction = DIAGRAM_ACTIONS.DiagramAction;

const _getRemoveNodeAction = (dispatch: Dispatch<DiagramAction>) => (nodeId: string) => removeNode(nodeId)(dispatch);
const _getSelectNodeAction = (dispatch: Dispatch<DiagramAction>) => (nodeId: Nullable<string>) => selectNode(nodeId)(dispatch);
const _getSetNodeSettingsAction = (dispatch: Dispatch<DiagramAction>) => (nodeId: string, settings: object) => setNodeSettings(nodeId, settings)(dispatch);
const _getRemoveLinkAction = (dispatch: Dispatch<DiagramAction>) => (linkId: string) => removeLink(linkId)(dispatch);

export function addNode(model: Engine.NodeModelConstructor, x: number, y: number) {
	return function (dispatch: Dispatch<DiagramAction>) {
		const entityRemovedListener = EngineUtil.generateEntityRemovedListener(_getRemoveNodeAction(dispatch));
		const selectionChangedListener = EngineUtil.generateSelectionChangedListener(_getSelectNodeAction(dispatch));
		const settingsChangedListener = EngineUtil.generateSettingsChangedListener(_getSetNodeSettingsAction(dispatch));

		const node = Engine.getInstance().addNode(model, x, y, selectionChangedListener, entityRemovedListener, settingsChangedListener);
		dispatch(DIAGRAM_ACTIONS.ADD_NODE(node));
	};
}

export function removeNode(nodeId: string) {
	return function (dispatch: Dispatch<DiagramAction>) {
		dispatch(DIAGRAM_ACTIONS.REMOVE_NODE(nodeId));
	};
}

export function selectNode(nodeId: Nullable<string>) {
	return function (dispatch: Dispatch<DiagramAction>) {
		dispatch(DIAGRAM_ACTIONS.SELECT_NODE(nodeId));
	};
}

export function setNodeSettings(nodeId: string, settings: object) {
	return function (dispatch: Dispatch<DiagramAction>) {
		dispatch(DIAGRAM_ACTIONS.SET_NODE_SETTINGS(nodeId, settings));
	};
}

export function tryAddLink(link: Engine.LinkModel, point: Engine.PointModel) {
	return function (dispatch: Dispatch<DiagramAction>) {
		const entityRemovedListener = EngineUtil.generateEntityRemovedListener(_getRemoveLinkAction(dispatch));

		if (Engine.getInstance().tryToConnectLinkOnPoint(link, point, entityRemovedListener)) {
			const sourceNode = link.getSourcePort().parent;
			const targetNode = link.getTargetPort().parent;
			dispatch(DIAGRAM_ACTIONS.ADD_LINK(link.id, sourceNode.id, targetNode.id));
			return true;
		}
		return false;
	};
}

export function removeLink(linkId: string) {
	return function (dispatch: Dispatch<DiagramAction>) {
		dispatch(DIAGRAM_ACTIONS.REMOVE_LINK(linkId));
	};
}

