import React from 'react'
import MessageBox from './MessageBox.js'
import $ from 'jquery'

export default React.createClass({
	contextTypes: {
		router: React.PropTypes.object
	},

	getInitialState() {
		return {
			name: "",
			username: "",
			errorMessage: "",
			password: ""
		}
	},

	handleNameChange(e) {
		this.setState({name: e.target.value})
	},

	handleUsernameChange(e) {
		this.setState({username: e.target.value})
	},

	handlePasswordChange(e) {
		this.setState({password: e.target.value})
	},

	handleFormSubmit(e) {
		e.preventDefault()
		var name = this.state.name.trim()
		var username = this.state.username.trim()
		var password = this.state.password.trim()
		$.ajax({
			type: "POST",
			url: "/users/register",
			data: {
				name: name,
				username: username,
				password: password
			},
			success: function(data) {
				localStorage.setItem('jwt', data.token)
				this.context.router.push('/me')
			}.bind(this),
			error: function(data) {
				this.setState({
					errorMessage: data.responseJSON.message
				})
			}.bind(this)
		})
	},

	render() {
		return (
			<form onSubmit={this.handleFormSubmit}>
				<h3>Register</h3>
				<MessageBox type="danger" message={this.state.errorMessage}/>
				<div className="form-group">
					<label for="name">Name</label>
					<input type="text" className="form-control" 
						placeholder="John Smith" onChange={this.handleNameChange}
						value={this.state.name}/>
				</div>
				<div className="form-group">
					<label for="username">Username</label>
					<input type="text" className="form-control" 
						placeholder="JohnSmith" onChange={this.handleUsernameChange}
						value={this.state.username}/>
				</div>
				<div className="form-group">
					<label for="password">Password</label>
					<input type="password" className="form-control" 
						placeholder="Password" onChange={this.handlePasswordChange}
						value={this.state.password}/>
				</div>
				<button type="submit" className="btn btn-default">Register</button>
			</form>
		)
	}
})
