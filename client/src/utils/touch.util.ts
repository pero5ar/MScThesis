function simulateMouseEvent(touch: Touch, type: keyof DocumentEventMap) {
	const simulatedEvent = document.createEvent('MouseEvent');
	simulatedEvent.initMouseEvent(
		type, true, true, window, 1,
		touch.screenX, touch.screenY,
		touch.clientX, touch.clientY,
		false, false, false, false,
		0 /* left */, null
	);
	touch.target.dispatchEvent(simulatedEvent);
}

export function touchHandler(event: TouchEvent) {
	const touches = event.changedTouches;
	const first = touches[0];

	if (touches.length > 1) {
		return;	// ignore multi-touch events
	}

	switch (event.type) {
		case 'touchstart':
			simulateMouseEvent(first, 'mouseover');
			simulateMouseEvent(first, 'mousemove');
			simulateMouseEvent(first, 'mousedown');
			break;
		case 'touchmove':
			simulateMouseEvent(first, 'mousemove');
			break;
		case 'touchend':
			simulateMouseEvent(first, 'mouseup');
			simulateMouseEvent(first, 'mouseout');
			simulateMouseEvent(first, 'click');
			break;
		default:
			return;	// return so that preventDefault doesn't get triggered
	}
	event.preventDefault();
}
