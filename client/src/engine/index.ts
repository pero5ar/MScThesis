import { DefaultLinkModel, BaseModel, BaseEvent, DefaultPortModel } from 'storm-react-diagrams';

import NodeModelClasses, { AbstractNodeModel } from './nodeModels';
import Engine from './engine';

// exposed storm-react-diagrams types:

export type PortModel = DefaultPortModel;

// exposed node model logic and types:

export type NodeModel = AbstractNodeModel;

export const NodeModels = NodeModelClasses;

// custom types:

export type LinkModel = DefaultLinkModel & { isTracked?: boolean; };

export type EventEntity = NodeModel | LinkModel;
export type ModelListenerFunction<T extends BaseModel = EventEntity> = (event: BaseEvent<T> & { isSelected?: boolean; }) => void;

export type ModelListenerFunctionCallback = (entityId: string | null) => void;
export type SettingChangedListenerFunctionCallback = (entityId: string | null, settings: object) => void;

// exposed engine logic:

export type EngineType = Engine;

let instance: Nullable<Engine> = null;

export function getInstance() {
	if (instance === null) {
		instance = new Engine();
	}
	return instance;
}
