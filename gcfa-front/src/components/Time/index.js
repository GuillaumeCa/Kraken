import React from 'react';
import Moment from 'react-moment';

function Time(props) {
  const { date, format } = props;
  return <Moment format={format} unix>{date / 1000}</Moment>;
}

function DueTime(props) {
  const { doc, format,  } = props;
  const { day, month, year } = doc;
  return <Moment format={format}></Moment>
}

export default Time;
