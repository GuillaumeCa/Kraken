import React, { Component } from 'react';

import TextField from 'material-ui/TextField';

import colors from '../../colors';

import Auth from '../../components/Auth';
import {
  SUPER_ADMIN,
  CONSULTANT
} from '../../constants';

class SearchBar extends Component {

  constructor(props) {
    super(props);
    this.fireKeyUp = null;
  }

  state = {
    searchContent: null,
  }

  handleKeyUp = (e) => {

    this.setState({searchContent: e.target.value})
    if(this.fireKeyUp != null) {
      clearTimeout(this.fireKeyUp);
      this.fireKeyUp = null;
    }
    
    else {
      this.fireKeyUp = setTimeout(this.fireSearch, 250);
    }
    
  }
  
  fireSearch = () => {
    clearTimeout(this.fireKeyUp);
    this.fireKeyUp = null;
    this.props.search(this.state.searchContent);
  }


  render() {
    const { searchContent } = this.state;

    return (
      <div>
        <TextField 
          id="searchText"
          onChange={(e) => this.handleKeyUp(e)}
          fullWidth={true}
          hintText="Rechercher"
          hintStyle={{textAlign: 'center', width: '100%'}}
          inputStyle={{textAlign: 'center'}}
        />
      </div>
    );
  }
}

export default SearchBar;
