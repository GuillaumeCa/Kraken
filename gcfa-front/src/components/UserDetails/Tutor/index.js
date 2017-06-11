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

const BUTTON_STYLE = {
  fontSize: 15,
}


class TutorDetail extends Component {

	state = {
		loadingApprentice: false,
		errorApprentice: false,
		apprenticeList: [],
	}

	componentDidMount() {
		this.requestApprenticeFromTutor(this.props.location.state.data.id);
	}

	requestApprenticeFromTutor = (tutorId) => {
		userManagementService.getAllApprenticesFromTutor(tutorId).then(res => {
			console.log(res)
			this.setState({apprenticeList: res.data});
		});
	}

	selectApprentice = () => {
		alert("apprenti selected");
	}

	render() {

		const { data } = this.props.location.state;
		const {
			loadingApprentice,
			errorApprentice,
			apprenticeList,
		} = this.state;

		return (
			<div className="row">
				<div className="col-5">
					{
						data &&
						<div>
							<h2 className="main-title"  style={TITLE_STYLE}>{data.user.firstName} {data.user.lastName}</h2>
							<table className="detail-list" style={{ margin: '20px auto' }}>
								<tbody>
									<tr>
										<th style={LABEL_STYLE}>Mail</th>
										<td><TextField
									      id="mail"
									      style={TD_STYLE}
									      disabled={true}
									      defaultValue={data.user.email}
									    /></td>
									</tr>
								</tbody>
							</table>
						</div>
					}
				</div>

				<div className="col-1"></div>
				<div className="col-6">
					<div>
						<section>
				          <h2 className="main-title">Apprentis</h2>
				          <Loader loading={loadingApprentice} error={errorApprentice}>
				            <List data={apprenticeList} emptyLabel="Aucun apprenti trouvé">
				              {
				                 apprenticeList.map(apprentice => {
				                    return (
				                      <BarCard key={apprentice.id} actions={
				                        <div>
									        <Link to={{
									          pathname: '/users/apprentices/detail',
									          state: {data: apprentice}

									        }}>
									          <FlatButton primary label="Voir" labelStyle={BUTTON_STYLE}/>
									        </Link>

									        <FlatButton primary label="Supprimer"
									          onTouchTap={() => this.selectApprentice(apprentice)}
									        />
									    </div>
				                      }>
				                      	<UserCard title={`${apprentice.user.firstName} ${apprentice.user.lastName}`} />
				                      </BarCard>
				                    )
				                  })
				              }
				            </List>
				          </Loader>
				        </section>
				    </div>
				</div>
			</div>

		)
	}
}

export default TutorDetail;
