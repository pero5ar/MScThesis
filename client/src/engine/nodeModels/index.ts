import AbstractNodeModel from './abstract.nodeModel';
import EndNodeModel from './end.nodeModel';
import SelectNodeModel from './select.nodeModel';
import StartNodeModel from './start.nodeModel';
import WhereNodeModel, { WHERE_CONDITIONS as WHERE_CONDITIONS_OBJECT } from './where.nodeModel';
import UnionNodeModel from './union.nodeModel';

export type AbstractNodeModel = AbstractNodeModel;

export type NodeModelConstructor<T extends AbstractNodeModel> = new (x: number, y: number, noPorts?: boolean) => T;
export type NodeModelClass<T extends AbstractNodeModel> = NodeModelConstructor<T> & { NAME: string; COLOR: string; };

export type GetNodeModelSettingsType<T extends AbstractNodeModel> = T extends AbstractNodeModel<infer TSettings> ? TSettings : never;

export const WHERE_CONDITIONS = WHERE_CONDITIONS_OBJECT;

export default {
	StartNodeModel,
	EndNodeModel,
	SelectNodeModel,
	WhereNodeModel,
	UnionNodeModel,
};

export function getClassFromInstanceType(instanceType: string): Nullable<NodeModelClass<AbstractNodeModel>> {
	if (instanceType === StartNodeModel.NAME) {
		return StartNodeModel;
	}
	if (instanceType === EndNodeModel.NAME) {
		return EndNodeModel;
	}
	if (instanceType === SelectNodeModel.NAME) {
		return SelectNodeModel;
	}
	if (instanceType === WhereNodeModel.NAME) {
		return WhereNodeModel;
	}
	if (instanceType === UnionNodeModel.NAME) {
		return UnionNodeModel;
	}
	return null;
}
