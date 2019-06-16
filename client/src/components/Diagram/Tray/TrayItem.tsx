import * as React from 'react';
import Button from 'react-bootstrap/Button';

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
			<Button
				className="tray-item"
				variant="secondary"
				style={{ backgroundColor: this.props.model.COLOR }}
				onMouseDown={this.onMouseDown}
				block={true}
				disabled={this.props.disabled}
			>
				{this.props.model.NAME}
			</Button>
		);
	}
}
