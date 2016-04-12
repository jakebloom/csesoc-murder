import React from 'react'
import MessageBox from './MessageBox.js'

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
			}
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
				codeword: "yo"
			}
		})
		console.log(this.state)
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
				<form className="form-inline" >
					<div className="form-group">
						<label for="kill">Killed someone? Put their codeword here: </label>
						<input type="text" className="form-control" placeholder="e.g. wobbegong" />
					</div>
					<button type="submit" className="btn btn-default">Kill</button>
				</form>			
			</div>
		)
	}
})