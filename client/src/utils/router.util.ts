import { history } from '../index';

export function redirect(route: string) {
	history.push(route);
}
