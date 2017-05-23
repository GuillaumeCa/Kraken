import React, { Component } from 'react';

import FlatButton from 'material-ui/FlatButton';

import BarCard, { UserCard, List } from '../../components/BarCard';


const BUTTON_STYLE = {
  fontSize: 15,
}

class ApprenticeList extends Component {

	state = {
		apprenticeList: [],
	}

	
	render() {
		return (
			<div className="row">
				<div className="col-4">
					<p>A1</p>
					<BarCard key={1} actions={
                        <FlatButton primary label="Voir" labelStyle={BUTTON_STYLE}
                          onTouchTap={() => alert("okokokok")}
                        />
                      }>
                      <UserCard title="Poul SAVAVABASY" />

                      </BarCard>

				</div>
				<div className="col-4">
					<p>A2</p>
					<BarCard key={2} actions={
                        <FlatButton primary label="Voir" labelStyle={BUTTON_STYLE}
                          onTouchTap={() => alert("okokokok")}
                        />
                      }>
                      <UserCard title="Poul SAVAVABASY" />

                    </BarCard>

				</div>
				<div className="col-4">
					<p>A3</p>
					<BarCard key={3} actions={
                        <FlatButton primary label="Voir" labelStyle={BUTTON_STYLE}
                          onTouchTap={() => alert("okokokok")}
                        />
                      }>
                      <UserCard title="Poul SAVAVABASY" />

                    </BarCard>
				</div>
			</div>
		)
	}
}

export default ApprenticeList;