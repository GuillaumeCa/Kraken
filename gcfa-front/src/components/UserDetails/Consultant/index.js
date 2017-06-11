import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import FlatButton from 'material-ui/FlatButton';
import BarCard, { UserCard, List } from '../../BarCard';
import Loader from '../../Loader';
import TextField from 'material-ui/TextField';
import Time, { DueTime } from '../../Time';


import * as userManagementService from '../../../services/userManagementService';


const TITLE_STYLE = {
    textAlign: 'center',
}

const LABEL_STYLE = {
	width:100
}

const TD_STYLE = {
	width: 180,
}


class ConsultantDetail extends Component {s

	render() {
		console.log(this.props.location.state.data)
		const { data } = this.props.location.state;

		return (
			<div className="row">
				<div className="col-12">
					{
						data &&
						<div>
							<h2 className="main-title"  style={TITLE_STYLE}>{data.firstName} {data.lastName}</h2>
							<table className="detail-list" style={{ margin: '20px auto' }}>
								<tbody>
									<tr>
										<th style={LABEL_STYLE}>Mail</th>
										<td><TextField
									      id="mail"
									      style={TD_STYLE}
									      disabled={true}
									      defaultValue={data.email}
									    /></td>
									</tr>
								</tbody>
							</table>
						</div>
					}
				</div>
			</div>

		)
	}
}

export default ConsultantDetail;
