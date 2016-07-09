import React from 'react'
import Dropzone from 'react-dropzone'

export default React.createClass({
	render(){
		return (
			<div>
				<Dropzone>
					<div>Something here?</div>
				</Dropzone>
			</div>
		);
	}
});