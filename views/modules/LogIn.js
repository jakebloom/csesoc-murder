import React from 'react'
import MessageBox from './MessageBox.js'
import $ from 'jquery'

export default React.createClass({
	contextTypes: {
		router: React.PropTypes.object
	},

	getInitialState() {
		return {
			zid: "",
			password: ""
		}
	},

	handleZidChange(e) {
		this.setState({zid: e.target.value})
	},

	handlePasswordChange(e) {
		this.setState({password: e.target.value})
	},

	handleFormSubmit(e) {
		e.preventDefault();
		var zid = this.state.zid.trim()
		var password = this.state.password.trim()
		$.ajax({
			type: "POST",
			url: "/users/login",
			data: {
				zid: zid,
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
				<h3>Log In</h3>
				<MessageBox type="danger" message={this.state.errorMessage}/>
				<div className="form-group">
					<label for="zid">zID</label>
					<input type="text" className="form-control" 
					placeholder="z1234567" onChange={this.handleZidChange}
					value={this.state.zid}/>
				</div>
				<div className="form-group">
					<label for="password">zPass</label>
					<input type="password" className="form-control" 
					placeholder="Password" onChange={this.handlePasswordChange}
					value={this.state.password}/>
				</div>
				<button type="submit" className="btn btn-default">Log In</button>
			</form>
		)
	}
})

