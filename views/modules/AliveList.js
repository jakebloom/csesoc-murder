import React from 'react'

export default React.createClass({
	render() {
		var alive = this.props.data.map(function(user){
			return (
				<tr><td>{user.name}</td></tr>
			)
		});
		return (
			<tbody>
				{alive}
			</tbody>
		)
	}
})