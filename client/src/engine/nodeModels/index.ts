import AbstractNodeModel from './abstract.nodeModel';
import EndNodeModel from './end.nodeModel';
import SelectNodeModel from './select.nodeModel';
import StartNodeModel from './start.nodeModel';
import WhereNodeModel from './where.nodeModel';

export type AbstractNodeModel = AbstractNodeModel;

export type NodeModelConstructor<T extends AbstractNodeModel> = new (x: number, y: number) => T;

export default {
	StartNodeModel,
	EndNodeModel,
	SelectNodeModel,
	WhereNodeModel,
};
