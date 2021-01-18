import { define, html } from 'hybrids'
import styles from './sabo-board.comp.css'

import SaboRow from './sabo-row.js'
import SaboTile from './sabo-tile.js'

const range = (a, b) => Array.from({length: b - a}, (_, i) => i + a)

const dist = ([ax, bx], [ay, by]) => Math.sqrt(Math.pow(ax - ay, 2) + Math.pow(bx - by, 2))

const easeInQuad = (x) => x * x
const easeInCubic = (x) => x * x * x
const easeInQuart = (x) => x * x * x * x

const SaboBoard = {
	w: 12,
	h: 5,
	start: ({h}) => [0, Math.floor(h / 2)],
	ends: ({h, w}) => [
		[w - 2, 0],
		[w - 1, Math.floor(h / 2)],
		[w - 2, h - 1]
	],
	maxDist: ({w, h, start}) => dist([w - 1, h - 1], start),
	score: ({w, h, start, maxDist}) => (x, y) => {
		const d = dist([x, y], start) / maxDist
		const centerLaneBoost = (Math.floor(h / 2) + 1 - dist([start[0], y], start)) * 0.25

		return d + centerLaneBoost
	},
	render: ({w, h, start, ends, score}) => html`<div class="sabo-board"
		style="
			grid-template-rows: repeat(${h}, minmax(0, auto));
			grid-template-columns: repeat(${w}, minmax(0, auto));
		">
		${range(0, h).map((y) => range(0, w).map((x) => html`<sabo-tile
			data-x="${x}"
			data-y="${y}"
			data-score="${score(x, y, w, h)}"
			start="${start[0] === x && start[1] === y}"
			end="${ends.some((end) => end[0] === x  && end[1] === y)}"
			score="${easeInQuad(score(x, y, w, h))}"
			threshold="${1.6}"
		></sabo-tile>`))}
	</div>`.style(styles).define({SaboRow, SaboTile})
}

define('sabo-board', SaboBoard)

export default SaboBoard

