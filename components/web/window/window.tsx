import { Component, ComponentChildren, render } from 'preact';

const body = document.head.parentElement!.querySelector('body')!;

let windowCreated = false;

export class Window extends Component<{ children: ComponentChildren }> {
	render() {
		return this.props.children;
	}

	static create(children: ComponentChildren) {
		if (windowCreated) return;
		body.innerHTML = '';
		windowCreated = true;
		render(<Window>{children}</Window>, body);
	}
}
