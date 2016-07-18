import React from 'react'
import Time from 'react-time'

export default React.createClass({
	render(){
		var list = this.props.data.map(function(kill){
			return (
				<tr>
					<td>{kill.killer.name}</td>
					<td>{kill.victim.name}</td>
					<td><Time value={kill.time} titleFormat="DD/MM/YY hh:mm a" relative /></td>
				</tr>
			)
		})
		return (
			<tbody>{list}</tbody>
		)
	}
})