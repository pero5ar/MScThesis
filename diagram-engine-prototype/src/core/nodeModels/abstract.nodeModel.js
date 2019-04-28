import { DefaultNodeModel } from 'storm-react-diagrams';

export const IN_PORT_LABEL = '>|';
export const OUT_PORT_LABEL = '|>';

export class AbstractNodeModel extends DefaultNodeModel {
	/**
	 * @param {string} name 
	 * @param {string} color 
	 * @param {Object} settings 
	 * @param {number} x 
	 * @param {number} y 
	 */
	constructor(name, color, settings, x, y) {
		super(name, color);

		this.x = x;
		this.y = y;

		this.isTracked = false;
		this._settings = settings;
	}

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