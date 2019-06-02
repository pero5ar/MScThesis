import NodeData from '../../models/nodeData.model';

interface NodesDictValue {
	settings: object;
	previousNodeId: Nullable<string>;
	inLinkId: Nullable<string>;
	nextNodeId: Nullable<string>;
	outLinkId: Nullable<string>;
}
type NodesDict = { [nodeId: string]: NodesDictValue; };

type LinksDictValue = {
	sourceNodeId: string;
	targetNodeId: string;
}
type LinksDict = { [linkId: string]: LinksDictValue; };

type NodeDataDict = { [nodeId: string]: NodeData; };

interface DiagramState {
	selectedNodeId: Nullable<string>;
	startNodeId: Nullable<string>;
	endNodeId: Nullable<string>;
	nodes: NodesDict;
	links: LinksDict;
	dataByNode: NodeDataDict;
}

export default DiagramState;
