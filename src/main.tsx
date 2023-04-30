import 'dev-only:preact/debug';
import { render } from 'preact';
import { App } from './app';
import './index.css';

render(<App />, document.getElementById('app') as HTMLElement);
