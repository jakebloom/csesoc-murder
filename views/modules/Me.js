import React from 'react'
import MessageBox from './MessageBox.js'
import $ from 'jquery'

export default React.createClass({
	contextTypes: {
		router: React.PropTypes.object
	},

	getInitialState() {
		return {
			user: {
				name: null,
				username: null,
				codeword: null
			},
			message: {
				type: null,
				message: null
			},
			killword: ""
		}
	},

	componentDidMount(){
		$.ajax({
			type: "GET",
			url: "/users/me",
			headers: {
				Authorization: 'Bearer ' + localStorage.jwt || ""
			},
			success: function(data){
				this.setState({
					user: {
						name: data.name,
						zid: data.zid,
						codeword: data.codeword,
						target: data.target,
						codeword: data.codeword,
						alive: data.alive
					}
				})
			}.bind(this),
			error: function(data){
				//If this is unsuccessful, we aren't logged in
				this.context.router.push('/')
			}.bind(this)
		})
		
	},

	handleKillwordChange(e) {
		this.setState({killword: e.target.value})
	},

	handleFormSubmit(e) {
		e.preventDefault()
		var codeword = this.state.killword.trim().toLowerCase()
		$.ajax({
			type: "POST",
			url: "users/kill",
			headers: {
				Authorization: 'Bearer ' + localStorage.jwt || ""
			},
			data: {
				codeword: codeword
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
				console.log(data)
				this.setState({
					message: {
						type: "danger",
						message: data.responseJSON.message
					}
				})
			}.bind(this)
		})
	},

	render() {
		return (
			<div>
				<h3>Hello, {this.state.user.name} </h3>
				<p><strong>zID:</strong> {this.state.user.zid}</p>
				<p><strong>Target:</strong>  {this.state.user.target ? this.state.user.target.name : "Nobody... yet..."} </p>
				<p><strong>Codeword:</strong> &quot;{this.state.user.codeword}&quot; (give this to the person who kills you)</p>
				<p> {this.state.user.alive ? "You are still alive" : "You are dead. rip."} </p>
				<MessageBox type={this.state.message.type} message={this.state.message.message} />
				<form className="form-inline" onSubmit={this.handleFormSubmit}>
					<div className="form-group">
						<label for="kill" className="kill">Killed someone? Put their codeword here: </label>
						<input type="text" className="form-control" 
						placeholder="e.g. wobbegong" onChange={this.handleKillwordChange}
						value={this.state.killword}/>
					</div>
					<button type="submit" className="btn btn-default kill">Kill</button>
				</form>			
			</div>
		)
	}
})