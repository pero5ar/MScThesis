import * as React from 'react';

import { NodeModelClass } from 'engine';

interface OwnProps {
	disabled?: boolean;
	model: NodeModelClass;
	onClick: (event: React.MouseEvent, model: NodeModelClass) => void;
}

type Props = OwnProps;

export default class TrayItem extends React.PureComponent<Props> {
	static defaultProps = {
		disabled: false,
	}

	onMouseDown = (event: React.MouseEvent<HTMLButtonElement>) => {
		const { disabled, onClick, model } = this.props;
		if (disabled) {
			return;
		}
		onClick(event, model);
	}

	render() {
		return (
			<button
				style={{ borderColor: this.props.model.COLOR }}
				onMouseDown={this.onMouseDown}
				className="tray-item"
				disabled={this.props.disabled}
			>
				{this.props.model.NAME}
			</button>
		);
	}
}
