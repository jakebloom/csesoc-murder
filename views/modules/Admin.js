import React from 'react'
import MessageBox from './MessageBox.js'

export default React.createClass({
	render() {
		return (
			<div>
				<h3>Admin</h3>
				<MessageBox type="danger" />
				<MessageBox type="success" />
				
				<div className="form-group">
					<button className="btn btn-default btn-primary">Assign codewords</button>
				</div>
				<div className="form-group">
					<button className="btn btn-default btn-danger">Start new game</button>
				</div>
			</div>
		)
	}
})