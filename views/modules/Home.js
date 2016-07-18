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
			url: "/kills/20",
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
				<h1>CSESoc Murder</h1>
				<h3>Rules</h3>
				<ul>
					<li>When the game starts, you will be given a target and a codeword</li>
					<li>You must find your target and "kill" them</li>
					<li>You can kill someone by saying "you're dead" to them where nobody else can hear you</li>
					<li>Bathrooms and areas within five metres of bathrooms are out of bounds</li>
					<li>If you are killed, you must give your codeword to your killer</li>
					<li>Once you kill somebody and get their codeword, enter it on the "Me" page to recieve your new target</li>
					<li>The aim of the game is to meet new people and make friends, so be kind to your killers and consider getting coffee with them!</li>
				</ul>
				<h3>The following players are still alive</h3>
				<table className="table table-striped">
					<thead>
						<tr>
							<th>Name</th>
						</tr>
					</thead>
						<AliveList data={this.state.users} />
				</table>
				<h3>Latest Kills</h3>
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

