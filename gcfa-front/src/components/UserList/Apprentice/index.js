import React, { Component } from 'react';

import FlatButton from 'material-ui/FlatButton';
import BarCard, { UserCard, List } from '../../BarCard';
import Loader from '../../Loader';

import * as userManagementService from '../../../services/userManagementService';


const BUTTON_STYLE = {
  fontSize: 15,
}

const DATE = {
	currentYear: new Date().getFullYear(),
	currentMonth: new Date().getMonth()
}

class ApprenticeList extends Component {

	state = {
		apprenticeList: [[],[],[]],
		loadingApprentices: false,
		errorApprentices : false,
	}

	componentDidMount() {
	    if (this.props.tutor==null) {
		     this.requestAllApprentice();
	    }
	    else {
		     this.requestAllApprenticesFromTutor();
	    }
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

    requestAllApprenticesFromTutor = () => {
  		this.setState({ loadingApprentices: true });

      	userManagementService.getAllApprenticesFromTutor(this.props.tutor)
      		.then(res => {
      			var list = new Array();

      			list[0] = res.data.filter(function(element) {
      				return (element.promotion == DATE.currentYear + 3 && DATE.currentMonth >= 9) || (element.promotion == DATE.currentYear + 2 && DATE.currentMonth < 9)
      			});

      			list[1] = res.data.filter(function(element) {
      				return (element.promotion == DATE.currentYear + 2 && DATE.currentMonth >= 9) || (element.promotion == DATE.currentYear + 1 && DATE.currentMonth < 9)
      			});

      			list[2] = res.data.filter(function(element) {
      				return ((element.promotion == DATE.currentYear + 1 && DATE.currentMonth >= 9) || (element.promotion == DATE.currentYear && DATE.currentMonth <= 10))
      			});

      			this.setState({apprenticeList: list, loadingApprentices: false});
        		})
        		.catch(err => {
  		      this.setState({ loadingApprentices: false, errorApprentices: true });
  		    })
      }

    viewApprenticeDetails = (user) => {
    	console.log(user)
    	this.setState({ selectedApprentice: user });
    }
	render() {

		const {apprenticeList, loadingApprentices, errorApprentices} = this.state;

		return (
			<div className="row">
				<div className="col-4">
					<p>A1</p>
					<Loader loading={loadingApprentices} error={errorApprentices}>
			          <List data={apprenticeList[0]} emptyLabel="Aucun apprenti A1 trouvé">
			            {
			              apprenticeList[0].map(data => {

			                return (
			                  <BarCard key={data.id} actions={
			                      <FlatButton primary label="Voir" labelStyle={BUTTON_STYLE}
			                        onTouchTap={(e) => this.viewApprenticeDetails(data)}
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

			                return (
			                  <BarCard key={data.id} actions={
			                      <FlatButton primary label="Voir" labelStyle={BUTTON_STYLE}
			                        onTouchTap={(e) => this.viewApprenticeDetails(data)}
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
			                return (
			                  <BarCard key={data.id} actions={
			                      <FlatButton primary label="Voir" labelStyle={BUTTON_STYLE}
			                        onTouchTap={() => (e) => this.viewApprenticeDetails(data)}
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
