type UserViewModel = {};
type ExerciseTableRowViewModel = {};

// pomocni tipovi
type Nullable<T> = null | T;
type NodeData = { keys: string[]; rows: object[]; };
interface NodesDictValue {
  settings: object;
  previousNodeIds: string[];
  inLinkIds: string[];
  nextNodeIds: string[];
  outLinkIds: string[];
}
interface LinksDictValue {
  sourceNodeId: string;
  targetNodeId: string;
}
// view model sucelja:
interface AttemptViewModel {
  //...
  currentState: {
    diagramState: Nullable<DiagramState>;
    serializedGraph: string;
  };
}
interface ExerciseViewModel {
  // ...
  lastAttempt: AttemptViewModel;
}

// korijensko stanje aplikacije
interface RootState {
  diagram: DiagramState;
  exercise: ExerciseState;
  http: HttpState;
  user: UserState;
}
// podstanja aplikacije:
interface DiagramState {
  selectedNodeId: Nullable<string>;
  startNodeIds: string[];
  endNodeId: Nullable<string>;
  nodes: { [nodeId: string]: NodesDictValue };
  links: { [linkId: string]: LinksDictValue; };
  dataByNode: { [nodeId: string]: NodeData; };
}
interface ExerciseState {
  table: { rows: ExerciseTableRowViewModel[]; };
  activeExercise: Nullable<ExerciseViewModel>;
  activeAttempt: Nullable<AttemptViewModel>;
}
interface HttpState { /* ... */ }
interface UserState {
  user: Nullable<UserViewModel>;
  isAuthenticated: boolean;
}
