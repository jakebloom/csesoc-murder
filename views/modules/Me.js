import React from 'react'
import MessageBox from './MessageBox.js'
import $ from 'jquery'

export default React.createClass({
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
		this.setState({
			user: {
				name: "Jake",
				username: "jake",
				codeword: "word",
				target: {
					name: "new"
				},
				codeword: "yo",
				alive: true
			}
		})
	},

	handleKillwordChange(e) {
		this.setState({killword: e.target.value})
	},

	handleFormSubmit(e) {
		e.preventDefault()
		var codeword = this.state.killword.trim()
		$.ajax({
			type: "POST",
			url: "users/kill",
			data: {
				codeword: codeword
			},
			success: function(data) {
				console.log(data)
				this.setState({
					killword: ""
				})
				//TODO: test and set state appropriately
			}.bind(this),
			error: function(data) {
				console.log(data)
				this.setState({
					killword: ""
				})
				//TODO: test and set state appropriately
			}.bind(this)
		})
	},

	render() {
		return (
			<div>
				<h3>Hello, {this.state.user.name} </h3>
				<p><strong>Username:</strong> {this.state.user.username}</p>
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