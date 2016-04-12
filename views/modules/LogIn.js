import React from 'react'
import MessageBox from './MessageBox.js'

export default React.createClass({
	render() {
		return (
			<form>
				<MessageBox type="danger" />

				<h3>Log In</h3>
				<div className="form-group">
					<label for="username">Username</label>
					<input type="text" className="form-control" placeholder="xXx_DaNk_GuY_420_69_xXx" />
				</div>
				<div className="form-group">
					<label for="password">Password</label>
					<input type="password" className="form-control" placeholder="Password" />
				</div>
				<button type="submit" className="btn btn-default">Log In</button>
			</form>
		)
	}
})

