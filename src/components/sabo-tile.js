import {define, html} from 'hybrids'
import styles from './sabo-tile.comp.css'

const SaboTile = {
	start: false,
	end: false,
	score: 0,
	threshold: 0,
	br: ({start, end, score, threshold}) =>
		!end && !start && Math.random() * score > threshold,
	bt: ({start, end, score, threshold}) =>
		!end && !start && Math.random() * score > threshold,
	bl: ({start, end, score, threshold}) =>
		!end && !start && Math.random() * score > threshold,
	bb: ({start, end, score, threshold}) =>
		!end && !start && Math.random() * score > threshold,
	render: ({start, end, br, bt, bl, bb}) => html`<div class="sabo-square p-1 relative
		${(start || end) ? 'border-gray-500' : 'border-gray-400'}
	">
		<div class="sabo-wall-t absolute top-0 left-0 top-0 w-full h-1
			${bt ? 'bg-gray-600' : 'bg-transparent'}"></div>
		<div class="sabo-wall-r absolute top-0 right-0 top-0 w-1 h-full
			${br ? 'bg-gray-600' : 'bg-transparent'}"></div>
		<div class="sabo-wall-b absolute bottom-0 left-0 bottom-0 w-full h-1
			${bb ? 'bg-gray-600' : 'bg-transparent'}"></div>
		<div class="sabo-wall-l absolute top-0 left-0 w-1 h-full
			${bl ? 'bg-gray-600' : 'bg-transparent'}"></div>
		<div class="sabo-tile
			${(start || end) ? 'bg-gray-500' : 'bg-gray-400'}
		">
		</div>
	</div>
	<style>
		.sabo-wall {
			border-top: 4px solid;
			border-right: 4px solid;
			border-bottom: 4px solid;
			border-left: 4px solid;
		}
	</style>`.style(styles)
}

define('sabo-tile', SaboTile)

export default SaboTile