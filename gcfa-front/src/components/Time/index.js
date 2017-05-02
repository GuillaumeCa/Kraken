import React from 'react';
import Moment from 'react-moment';

function Time(props) {
  const { date, format } = props;
  return <Moment format={format} unix>{date / 1000}</Moment>;
}

export default Time;
