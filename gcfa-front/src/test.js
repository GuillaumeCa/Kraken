import React, { Component } from 'react';

export default class Test extends Component {
	state = {
		counter: 0
	}

	componentDidMount() {
		setInterval(() => this.tick(), 1000);
	}

	tick() {
		this.setState({counter: this.state.counter+1});
	}

	render() {
		return (
			<div>
				<h1>{this.props.title}</h1>
				<p>{this.state.counter}</p>
				<p>{this.props.children}</p>
			</div>
		);
		
	}
}

export function Hello(props) {
	return <div>Hello</div>
}