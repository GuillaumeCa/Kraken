import React, { Component } from 'react';

import FlatButton from 'material-ui/FlatButton';
import BarCard, { UserCard, List } from '../../components/BarCard';
import Loader from '../../components/Loader';

import * as userManagementService from '../../services/userManagementService';



const BUTTON_STYLE = {
  fontSize: 15,
}


class ApprenticeList extends Component {

	state = {
		apprenticeList: [[],[],[]],
		loadingApprentices: false,
		errorApprentices : false,
	}

	componentDidMount() {
	  this.requestAllApprentice();
	}

	requestAllApprentice = () => {
		this.setState({ loadingApprentices: true });
  	userManagementService.getApprenticesByYear()
  		.then(list => {
  			this.setState({
          apprenticeList: list,
          loadingApprentices: false
        });
    	})
    	.catch(err => {
	      this.setState({ loadingApprentices: false, errorApprentices: true });
	    })
    }

	render() {

		const {apprenticeList, loadingApprentices, errorApprentices} = this.state;
		console.log(apprenticeList)
		return (
			<div className="row">
				<div className="col-4">
					<p>A1</p>
					<Loader loading={loadingApprentices} error={errorApprentices}>
			          <List data={apprenticeList[0]} emptyLabel="Aucun apprenti A1 trouvé">
			            {
			              apprenticeList[0].map(data => {
			              	console.log(data)
			                return (
			                  <BarCard key={data.id} actions={
			                      <FlatButton primary label="Voir" labelStyle={BUTTON_STYLE}
			                        onTouchTap={() => alert("ok")}
			                      />
			                    }>

			                    <UserCard title= {
			                    	<span>{data.user.firstName} {data.user.lastName}</span>
			                    }
			                    />
			                  </BarCard>
			                )
			              })
			            }
			          </List>
			        </Loader>

				</div>
				<div className="col-4">
					<p>A2</p>
					<Loader loading={loadingApprentices} error={errorApprentices}>
			          <List data={apprenticeList[1]} emptyLabel="Aucun apprenti A2 trouvé">
			            {
			              apprenticeList[1].map(data => {
			              	console.log(data)
			                return (
			                  <BarCard key={data.id} actions={
			                      <FlatButton primary label="Voir" labelStyle={BUTTON_STYLE}
			                        onTouchTap={() => alert("ok")}
			                      />
			                    }>

			                    <UserCard title= {
			                    	<span>{data.user.firstName} {data.user.lastName}</span>
			                    }
			                    />
			                  </BarCard>
			                )
			              })
			            }
			          </List>
			        </Loader>

				</div>
				<div className="col-4">
					<p>A3</p>
					<Loader loading={loadingApprentices} error={errorApprentices}>
			          <List data={apprenticeList[2]} emptyLabel="Aucun apprenti A3 trouvé">
			            {
			              apprenticeList[2].map(data => {
			              	console.log(data)
			                return (
			                  <BarCard key={data.id} actions={
			                      <FlatButton primary label="Voir" labelStyle={BUTTON_STYLE}
			                        onTouchTap={() => alert("ok")}
			                      />
			                    }>

			                    <UserCard title= {
			                    	<span>{data.user.firstName} {data.user.lastName}</span>
			                    }
			                    />
			                  </BarCard>
			                )
			              })
			            }
			          </List>
			        </Loader>
				</div>
			</div>
		)
	}
}

export default ApprenticeList;
