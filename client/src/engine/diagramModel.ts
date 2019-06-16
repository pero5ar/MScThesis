/* eslint-disable @typescript-eslint/no-explicit-any */

import { DiagramModel, DiagramEngine } from 'storm-react-diagrams';

import { getClassFromInstanceType } from './nodeModels';

export default class CustomDiagramModel extends DiagramModel {

	deSerializeDiagram(object: any, diagramEngine: DiagramEngine) {
		// source implementation: https://github.com/projectstorm/react-diagrams/blob/master/src/models/DiagramModel.ts#L69

		this.deSerialize(object, diagramEngine);

		this.offsetX = object.offsetX;
		this.offsetY = object.offsetY;
		this.zoom = object.zoom;
		this.gridSize = object.gridSize;

		// deserialize nodes
		Object.values(object.nodes).forEach((_node: any) => {
			const NodeModelClass = getClassFromInstanceType(_node.extras.instanceType);
			let nodeOb = null;
			if (!NodeModelClass) {
				console.error('Could not rebuild node: ', _node.id);
				nodeOb = diagramEngine.getNodeFactory(_node.type).getNewInstance(_node);
			} else {
				nodeOb = new NodeModelClass(_node.x, _node.y, true);
			}
			nodeOb.setParent(this);
			nodeOb.deSerialize(_node, diagramEngine);
			this.addNode(nodeOb);
		});

		// deserialze links
		Object.values(object.links).forEach((_link: any) => {
			const linkOb = diagramEngine.getLinkFactory(_link.type).getNewInstance();
			linkOb.setParent(this);
			linkOb.deSerialize(_link, diagramEngine);
			this.addLink(linkOb);
		});
	}
}
