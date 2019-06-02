import NodeData from '../../models/nodeData.model';

import { DefaultNodeModel, BaseModelListener, BaseEvent } from 'storm-react-diagrams';

type AbstractNodeModelEvent = BaseEvent<AbstractNodeModel>;

type AbstractNodeModelIterateListenersCallback = (listener: AbstractNodeModelListener, event: AbstractNodeModelEvent) => void

export interface AbstractNodeModelListener extends BaseModelListener {
	selectionChanged?(event: AbstractNodeModelEvent & { isSelected: boolean; }): void;
	entityRemoved?(event: AbstractNodeModelEvent): void;
	settingsChanged?(event: AbstractNodeModelEvent): void;
}

export const IN_PORT_LABEL = '>|';
export const OUT_PORT_LABEL = '|>';

export default abstract class AbstractNodeModel<TSettings = {}> extends DefaultNodeModel {
	isTracked: boolean;
	protected _settings: TSettings;

	constructor(name: string, color: string, settings: TSettings, x: number, y: number) {
		super(name, color);

		this.x = x;
		this.y = y;

		this.isTracked = false;
		this._settings = settings;
	}

	/** Type override of DefaultNodeModel.addListener */
	addListener(listener: AbstractNodeModelListener): string {
		return super.addListener(listener);
	}

	/** Type override of BaseEntity.iterateListeners */
	iterateListeners(cb: AbstractNodeModelIterateListenersCallback): void {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		return super.iterateListeners(cb as (t: AbstractNodeModelListener, event: BaseEvent) => any);
	}

	abstract run(data: NodeData): NodeData;

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
