import NodeData from 'models/nodeData.model';
import { DiagramState } from 'state/diagram';

export interface AttemptState {
	diagramState: Nullable<DiagramState>;
	serializedGraph: string;
}

export interface Create {
	state: AttemptState;
}

export interface Update {
	state: AttemptState;
	output: Nullable<NodeData>;
	hasEnded: boolean;
}
