function simulateMouseEvent(touchEvent, type) {
	if (touchEvent.relatedEvent) console.log(touchEvent);
	const simulatedEvent = document.createEvent("MouseEvent");
	simulatedEvent.initMouseEvent(
		type, true, true, window, 1, 
		touchEvent.screenX, touchEvent.screenY, 
		touchEvent.clientX, touchEvent.clientY, false, 
		false, false, false, 0/*left*/, null
	);
	touchEvent.target.dispatchEvent(simulatedEvent);
}

export function touchHandler(event) {
	const touches = event.changedTouches;
	const first = touches[0];

	if (touches > 1) {
		return;
	}

	switch (event.type) {
		case "touchstart": 
			simulateMouseEvent(first, 'mouseover');
			simulateMouseEvent(first, 'mousemove');
			simulateMouseEvent(first, 'mousedown');
			break;
		case "touchmove":
			simulateMouseEvent(first, 'mousemove');
			break;
		case "touchend":
			simulateMouseEvent(first, 'mouseup');
			simulateMouseEvent(first, 'mouseout');
			simulateMouseEvent(event, 'click');
			break;
		default:
			return;
	}

	event.preventDefault();
}
