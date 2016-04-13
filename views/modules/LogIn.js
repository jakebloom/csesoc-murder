import React from 'react'
import MessageBox from './MessageBox.js'
import $ from 'jquery'

export default React.createClass({
	getInitialState() {
		return {
			username: "",
			password: ""
		}
	},

	handleUsernameChange(e) {
		this.setState({username: e.target.value})
	},

	handlePasswordChange(e) {
		this.setState({password: e.target.value})
	},

	handleFormSubmit(e) {
		e.preventDefault();
		var username = this.state.username.trim()
		var password = this.state.password.trim()
		$.ajax({
			type: "POST",
			url: "/users/login",
			data: {
				username: username,
				password: password
			},
			success: function(data) {
				localStorage.setItem('jwt', data.token)
				//TODO: Redirect to current user page
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
				<h3>Log In</h3>
				<MessageBox type="danger" message={this.state.errorMessage}/>
				<div className="form-group">
					<label for="username">Username</label>
					<input type="text" className="form-control" 
					placeholder="xXx_DaNk_GuY_420_69_xXx" onChange={this.handleUsernameChange}
					value={this.state.username}/>
				</div>
				<div className="form-group">
					<label for="password">Password</label>
					<input type="password" className="form-control" 
					placeholder="Password" onChange={this.handlePasswordChange}
					value={this.state.password}/>
				</div>
				<button type="submit" className="btn btn-default">Log In</button>
			</form>
		)
	}
})

