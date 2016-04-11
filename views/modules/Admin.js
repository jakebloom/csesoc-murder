import React from 'react'

export default React.createClass({
	render() {
		return (
			<div>
				<h3>Admin</h3>
				<div className="alert alert-danger row"> message </div>
				<div className="alert alert-success row"> message </div>
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