import React from 'react'
import MessageBox from './MessageBox.js'

export default React.createClass({
	render() {
		return (
			<div>
				<h3>Hello, user.name </h3>
				<p><strong>Username:</strong> user.username</p>
				<p><strong>Target:</strong>  user.target ? user.target.name : "Nobody... yet..." </p>
				<p><strong>Codeword:</strong> &quot; user.codeword &quot; (give this to the person who kills you)</p>
				<p> user.alive ? "You are still alive" : "You are dead. rip." </p>
				<MessageBox type="danger" />
				<MessageBox type="success" />
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