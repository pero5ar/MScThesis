import {
	BaseAction,
	BaseEvent,
	BaseModel,
	DefaultLinkModel,
	DefaultPortModel,
	DiagramWidget as DiagramWidgetClass,
	MoveItemsAction as MoveItemsActionClass,
	PointModel as PortModelClass,
} from 'storm-react-diagrams';

import NodeModelClasses, { AbstractNodeModel, NodeModelConstructor } from './nodeModels';
import Engine from './engine';

// exposed storm-react-diagrams types:

export type BaseAction = BaseAction;
export type PortModel = DefaultPortModel;

// exposed storm-react-diagrams classes:

export const DiagramWidget = DiagramWidgetClass;
export type DiagramWidget = DiagramWidgetClass;
export const MoveItemsAction = MoveItemsActionClass;
export type MoveItemsAction = MoveItemsActionClass;
export const PointModel = PortModelClass;
export type PointModel = PortModelClass;

// exposed node model logic and types:

export type NodeModel = AbstractNodeModel;
export type NodeModelConstructor = NodeModelConstructor<NodeModel>;
export const NodeModels = NodeModelClasses;

// custom types:

export type LinkModel = DefaultLinkModel & { isTracked?: boolean; };

export type EventEntity = NodeModel | LinkModel;
export type ModelListenerFunction<T extends BaseModel = EventEntity> = (event: BaseEvent<T> & { isSelected?: boolean; }) => void;

export type EntityRemovedListenerFunctionCallback = (entityId: string) => void;
export type EntitySelectedListenerFunctionCallback = (entityId: string | null) => void;
export type SettingChangedListenerFunctionCallback = (entityId: string, settings: object) => void;

// exposed engine logic:

export type EngineType = Engine;

let instance: Nullable<Engine> = null;

export function getInstance() {
	if (instance === null) {
		instance = new Engine();
	}
	return instance;
}
