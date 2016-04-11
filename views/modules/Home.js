import React from 'react'
import AliveList from './AliveList.js'
import $ from 'jquery'

export default React.createClass({
	getInitialState() {
		return {data: []};
	},

	componentDidMount() {
		$.ajax({
	      url: "/users/alive",
	      dataType: 'json',
	      cache: false,
	      success: function(data) {
	        this.setState({data: data});
	      }.bind(this),
	      error: function(xhr, status, err) {
	        console.error(this.props.url, status, err.toString());
	      }.bind(this)
	   });
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
						<AliveList data={this.state.data} />
				</table>
			</div>
		)
	}
})

