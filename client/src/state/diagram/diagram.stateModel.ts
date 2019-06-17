import NodeData from 'models/nodeData.model';

interface NodesDictValue {
	settings: object;
	previousNodeIds: string[];
	inLinkIds: string[];
	nextNodeIds: string[];
	outLinkIds: string[];
}
type NodesDict = { [nodeId: string]: NodesDictValue; };

type LinksDictValue = {
	sourceNodeId: string;
	targetNodeId: string;
}
type LinksDict = { [linkId: string]: LinksDictValue; };

type NodeDataDict = { [nodeId: string]: NodeData; };

export interface DiagramState {
	selectedNodeId: Nullable<string>;
	startNodeIds: string[];
	endNodeId: Nullable<string>;
	nodes: NodesDict;
	links: LinksDict;
	dataByNode: NodeDataDict;
}
