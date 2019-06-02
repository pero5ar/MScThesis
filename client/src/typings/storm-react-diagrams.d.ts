import * as SRD from 'storm-react-diagrams';

declare module 'storm-react-diagrams' {
	export interface BaseEvent<T extends SRD.BaseEntity = BaseEntity> {
		entity: T;
		stopPropagation: () => any;	// eslint-disable-line @typescript-eslint/no-explicit-any
		firing: boolean;
		id: string;
	}
}
