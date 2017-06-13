import React, { Component } from 'react';
import './NavBar.css';
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

  handleKeyUp = () => {
    if(this.fireKeyUp != null) {
      clearTimeout(this.fireKeyUp);
      this.fireKeyUp = null;
    }
    
    else {
      this.fireKeyUp = setTimeout(this.fireSearch, 500);
    }
    
  }
  
  fireSearch = () => {
    this.fireKeyUp = null;
  }

  launchSearch()

  render() {
    const { searchContent } = this.state;

    return (
      <div>
        <TextField 
          id="searchText"
          value={searchContent}
          onKeyUp={() => this.handleKeyUp}
        />
      </div>
    );
  }
}

export default SearchBar;
