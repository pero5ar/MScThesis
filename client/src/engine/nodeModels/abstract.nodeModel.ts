/* eslint-disable @typescript-eslint/no-explicit-any */

import { DefaultNodeModel, BaseModelListener, BaseEvent, DiagramEngine } from 'storm-react-diagrams';

import NodeData from 'models/nodeData.model';

type AbstractNodeModelEvent = BaseEvent<AbstractNodeModel>;

type AbstractNodeModelIterateListenersCallback = (listener: AbstractNodeModelListener, event: AbstractNodeModelEvent) => void

export interface AbstractNodeModelListener extends BaseModelListener {
	selectionChanged?(event: AbstractNodeModelEvent & { isSelected: boolean; }): void;
	entityRemoved?(event: AbstractNodeModelEvent): void;
	settingsChanged?(event: AbstractNodeModelEvent): void;
}

export const IN_PORT_LABEL = '>|';
export const OUT_PORT_LABEL = '|>';

export default abstract class AbstractNodeModel<TSettings = any> extends DefaultNodeModel {
	isTracked: boolean;
	protected _settings: TSettings;
	protected _instanceType: string;

	constructor(name: string, color: string, settings: TSettings, x: number, y: number) {
		super(name, color);

		this.x = x;
		this.y = y;

		this.isTracked = false;
		this._settings = settings;
		this._instanceType = name;
	}

	/** Type override of DefaultNodeModel.addListener */
	addListener(listener: AbstractNodeModelListener): string {
		return super.addListener(listener);
	}

	/** Type override of BaseEntity.iterateListeners */
	iterateListeners(cb: AbstractNodeModelIterateListenersCallback): void {
		return super.iterateListeners(cb as (t: AbstractNodeModelListener, event: BaseEvent) => any);
	}

	serialize() {
		this.extras = { settings: this._settings, instanceType: this._instanceType };
		return super.serialize();
	}

	deSerialize(obj: any, engine: DiagramEngine) {
		super.deSerialize(obj, engine);
		this._settings = obj.extras.settings;
		this.extras = {};
	}

	abstract run(...dataArgs: NodeData[]): NodeData;

	get settings() {
		return this._settings;
	}

	set settings(newSettings) {
		this._settings = newSettings;
		this.iterateListeners((listener, event) => {
			if (listener.settingsChanged) {
				listener.settingsChanged(event);
			}
		});
	}
}
