import React from 'react';

const Checkbox = ({ label, value, onChange }) => (
	<div>
		<span>{label.replace('_', ' ')}</span>
		<input type="checkbox" onChange={onChange} checked={value} />
	</div>
);

const FOO = ['field_A', 'field_B', 'field_C'];

export default class SelectNodeSettings extends React.PureComponent {

	onCheck = (key, event) => {
		const { selectedKeys } = this.props.node.settings;

		let newSettings = null
		if (!event.target.checked && selectedKeys.includes(key)) {
			newSettings = { selectedKeys: selectedKeys.filter((_key) => _key !== key) };
		}
		if (event.target.checked && !selectedKeys.includes(key)) {
			newSettings = { selectedKeys: [...selectedKeys, key] };
		}
		
		if (!newSettings) {
			return;
		}
		this.props.node.settings = newSettings;
		this.forceUpdate();
	}

	render() {
		return (
			<div className="node-settings">
				<h3>SELECT node settings for {this.props.node.id}</h3>
				<br />
				<button onClick={this.props.removeNode}>Remove Node</button>
				<br />
				<br />
				{FOO.map((_key) => (
					<Checkbox
						key={_key}
						label={_key}
						value={this.props.node.settings.selectedKeys.includes(_key)}
						onChange={this.onCheck.bind(this, _key)}
					/>
				))}
			</div>
		);
	}
}