import React from 'react'
import MessageBox from './MessageBox.js'

export default React.createClass({
	render() {
		return (
			<form>
				<MessageBox type="danger" message={this.state.errorMessage}/>
				<h3>Register</h3>
				<div className="form-group">
					<label for="name">Name</label>
					<input type="text" className="form-control" placeholder="John Smith" />
				</div>
				<div className="form-group">
					<label for="username">Username</label>
					<input type="text" className="form-control" placeholder="JohnSmith" />
				</div>
				<div className="form-group">
					<label for="password">Password</label>
					<input type="password" className="form-control" placeholder="Password" />
				</div>
				<button type="submit" className="btn btn-default">Register</button>
			</form>
		)
	}
})
