import { history } from 'index';

export function redirect(route: string, replace = false, origin?: string) {
	const action = replace ? history.replace : history.push;
	let state = undefined;
	if (origin) {
		state = { origin };
	}
	action(route, state);
}
