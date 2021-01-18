import {define, html} from 'hybrids'

const SaboRow = {
	render: () => html`<div class="sabo-row">
		<slot></slot>
	</div>
	
	<style>
		.sabo-row {
			display: flex;
		}
	</style>`
}

define('sabo-row', SaboRow)

export default SaboRow