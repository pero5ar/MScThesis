/* eslint-disable @typescript-eslint/no-explicit-any */
import 'react-redux';

declare module 'react-redux' {

	export type ReactReduxAction = (dispatch: Dispatch<any>) => Promise<any>;

	export type DispatchPropsToReactReduxActions<TDispatchProps> = {
		[K in keyof TDispatchProps]:
		TDispatchProps[K] extends ((...args: any[]) => any)
			? (...args: Parameters<TDispatchProps[K]>) => (dispatch: Dispatch<any>) => ReturnType<TDispatchProps[K]>
			: TDispatchProps[K];
	}

	export type DispatchAction<TAction> =
		TAction extends (...args: any[]) => (dispatch: Dispatch<any>) => infer R
			? (...args: Parameters<TAction>) => R
			: TAction;

	export type ReactReduxActionsToDispatchActions<TReactReduxActions> = {
		[actionName in keyof TReactReduxActions]: DispatchAction<TReactReduxActions[actionName]>
	}

	export type DispatchPropsToComponentProps<TDispatchProps> = {
		[K in keyof TDispatchProps]:
		TDispatchProps[K] extends { [actionName: string]: (...args: any[]) => any; }
			? ReactReduxActionsToDispatchActions<TDispatchProps[K]>
			: TDispatchProps[K]
	}
}
