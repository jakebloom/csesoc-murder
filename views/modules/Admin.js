import React from 'react'
import MessageBox from './MessageBox.js'
import $ from 'jquery'

export default React.createClass({

	getInitialState(){
		return {
			message: {}
		}
	},

	setCodewords() {
		$.ajax({
			type: "GET",
			url: "/admin/assign",
			headers: {
				Authorization: 'Bearer ' + localStorage.jwt || ""
			},
			success: function(data) {
				this.setState({
					message: {
						type: "success",
						message: data.message
					}
				})
			}.bind(this),
			error: function(data) {
				this.setState({
					message: {
						type: "danger",
						message: data.message
					}
				})				
			}.bind(this)
		})
	},

	startGame() {},

	render() {
		return (
			<div>
				<h3>Admin</h3>
				<MessageBox type={this.state.message.type} message={this.state.message.message} />
				
				<div className="form-group">
					<button className="btn btn-default btn-primary" onClick={this.setCodewords}>Assign codewords</button>
				</div>
				<div className="form-group">
					<button className="btn btn-default btn-danger">Start new game</button>
				</div>
			</div>
		)
	}
})