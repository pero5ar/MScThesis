import AbstractNodeModel from './abstract.nodeModel';
import EndNodeModel from './end.nodeModel';
import SelectNodeModel from './select.nodeModel';
import StartNodeModel from './start.nodeModel';
import WhereNodeModel, { WHERE_CONDITIONS as WHERE_CONDITIONS_OBJECT } from './where.nodeModel';

export type AbstractNodeModel = AbstractNodeModel;

export type NodeModelConstructor<T extends AbstractNodeModel> = new (x: number, y: number) => T;
export type NodeModelClass<T extends AbstractNodeModel> = NodeModelConstructor<T> & { NAME: string; COLOR: string; };

export const WHERE_CONDITIONS = WHERE_CONDITIONS_OBJECT;

export default {
	StartNodeModel,
	EndNodeModel,
	SelectNodeModel,
	WhereNodeModel,
};
