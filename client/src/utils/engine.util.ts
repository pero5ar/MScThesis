import * as Engine from 'engine';

import NodeData from 'models/nodeData.model';

export function generateSelectionChangedListener(onSelectionChanged: Engine.EntitySelectedListenerFunctionCallback): Engine.ModelListenerFunction {
	return (event) => !event.entity.isSelected() ? onSelectionChanged(null) : event.entity.isTracked && onSelectionChanged(event.entity.id);
}

export function generateEntityRemovedListener(onEntityRemoved: Engine.EntityRemovedListenerFunctionCallback): Engine.ModelListenerFunction {
	return (event) => event.entity.isTracked && onEntityRemoved(event.entity.id);
}

export function generateSettingsChangedListener(onSettingsChanged: Engine.SettingChangedListenerFunctionCallback): Engine.ModelListenerFunction<Engine.NodeModel> {
	return (event) => event.entity.isTracked && event.entity.settings && onSettingsChanged(event.entity.id, event.entity.settings);
}

export function callNodeRun(nodeId: string, ...dataArgs: NodeData[]): NodeData {
	const node = Engine.getInstance().getNode(nodeId);
	if (!node) {
		throw new Error(`Node ${nodeId} does not exist`);
	}
	return node.run(...dataArgs);
}

type GetLinkAndPointFromMoveAction = {
	link: Nullable<Engine.LinkModel>;
	point: Nullable<Engine.PointModel>;
}
export function getLinkAndPointFromMoveAction(action: Engine.BaseAction): GetLinkAndPointFromMoveAction {
	if (!action || !(action instanceof Engine.MoveItemsAction) || !action.selectionModels || action.selectionModels.length !== 1) {
		return { link: null, point: null };
	}
	const point = action.selectionModels[0].model;
	if (!point || !(point instanceof Engine.PointModel)) {
		return { link: null, point: null };
	}
	const link = point.getParent();
	if (!link) {
		return { link: null, point };;
	}
	return { link: link as Engine.LinkModel, point };
}

export function countInPortsForNode(nodeId: string) {
	const node = Engine.getInstance().getNode(nodeId);
	if (!node) {
		throw new Error(`Node ${nodeId} does not exist`);
	}
	return node.getInPorts().length;
}
