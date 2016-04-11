import React from 'react'

export default React.createClass({
	render() {
		return(
			<div>
				<h3>Welcome</h3>
				<p>The following players are still alive</p>
				<table className="table table-striped">
					<thead>
						<tr>
							<th>Name</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Jake</td>
						</tr>
					</tbody>
				</table>
			</div>
		)
	}
})

