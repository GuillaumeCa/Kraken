import React from 'react';
import Moment from 'react-moment';

export default function Time(props) {
  const { date, format } = props;
  return <Moment format={format} unix>{date / 1000}</Moment>
}
