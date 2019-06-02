// STATE:

declare type NodesDictValue = {
	settings: object;
	previousNodeId: string;
	inLinkId: string;
	nextNodeId: string;
	outLinkId: string;
}
declare type NodesDict = { [nodeId: string]: NodesDictValue; }

declare type LinksDictValue = {
	sourceNodeId: string;
	targetNodeId: string;
}
declare type LinksDict = { [linkId: string]: LinksDictValue; }

declare type NodeData = {
	keys: string[];
	rows: { [key: string]: string | number }[];
}
declare type NodeDataDict = { [nodeId: string]: NodeData; }

declare type DiagramState = {
	selectedNodeId: string;
	startNodeId: string;
	endNodeId: string;
	nodes: NodesDict;
	links: LinksDict;
	dataByNode: NodeDataDict;
}