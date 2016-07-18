import React from 'react'
import AliveList from './AliveList.js'
import KillList from './KillList.js'
import $ from 'jquery'

export default React.createClass({
	fetchPlayersFromServer() {
		$.ajax({
	      url: "/users/alive",
	      type: "GET",
	      success: function(data) {
	        this.setState({users: data});
	      }.bind(this),
	      error: function(xhr, status, err) {
	        console.error(this.props.url, status, err.toString());
	      }.bind(this)
	   })
	},

	fetchKillsFromServer() {
		$.ajax({
			url: "/kills/10",
			type: "GET",
			success: function(data) {
				this.setState({kills: data})
			}.bind(this),
			error: function(xhr, status, err) {
	        	console.error(this.props.url, status, err.toString());
	      	}.bind(this)
		})
	},

	getInitialState() {
		return {users: [], kills: []}
	},

	componentDidMount() {
		this.fetchPlayersFromServer()
		this.fetchKillsFromServer()
	},

	render() {
		return(
			<div>
				<h3>Welcome</h3>
				<p>The following players are still alive</p>
				<table className="table table-striped">
					<thead>
						<tr>
							<th>Name</th>
						</tr>
					</thead>
						<AliveList data={this.state.users} />
				</table>
				<table className="table table-striped">
					<thead>
						<tr>
							<th>Killer</th>
							<th>Victim</th>
							<th>Time</th>
						</tr>
					</thead>
						<KillList data={this.state.kills} />
				</table>
			</div>
		)
	}
})

